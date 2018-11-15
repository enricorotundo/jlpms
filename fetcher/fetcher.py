import datetime
import json
import os
import logging

from github import Github
from pymongo import MongoClient
from dotenv import load_dotenv

# logging setup
logger = logging.getLogger('fetcher.py')
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
ch.setFormatter(formatter)
logger.addHandler(ch)

# load .env
load_dotenv(dotenv_path='.env')
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PWD")
conn_string = os.getenv("MONGO_CONN_STR").format(db_user, db_password)
github_access_token = os.getenv("GITHUB_TOKEN")

def handle(event, context):
    logger.info('Got event {}'.format(event))

    # db
    client = MongoClient(conn_string)
    db = client['jlpms']
    collection = db['items']

    # github
    query = "topic:jupyterlab-extension"
    g = Github(github_access_token)
    response = g.search_repositories(query=query)

    items = []
    for repo in response:
        logger.debug("repository id:{}".format(repo.raw_data["id"]))
        items.append(repo.raw_data)
    
    modified_count = 0
    upserted_count = 0
    for document in items:
        logger.debug("updating id:{}".format(document["id"]))
        try:
            update_res = collection.update_one({"id": document["id"]}, {"$set": document}, upsert=True)
            modified_count += update_res.modified_count
            if update_res.upserted_id:
                upserted_count += 1
        except Exception as e:
            logger.error("document id:{} caused: {}".format(document["id"], e))
    
    summary_str = '{} items, upserted {}, modified {}'.format(len(items), upserted_count, modified_count)
    logger.info(summary_str)

    return {
        'statusCode': 200,
        'body': json.dumps('Success! ' + summary_str)
    }

if __name__ == "__main__":
    print(handle(None, None))
