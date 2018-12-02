import datetime
import json
import os
import logging

import requests
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
    items_collection = db['items']
    readmes_collection = db['readmes']

    # github
    #query = "topic:jupyterlab-extension"
    g = Github(github_access_token)
    #response = g.search_repositories(query=query)

    items = items_collection.find()
    logger.info("found {} repositories in \"items\" collection".format(items.count()))

    modified_count = 0
    upserted_count = 0
    for item in items:
        try:
            logger.debug("repository id:{}".format(item["id"]))
            document = {"id": item["id"]}
            repo = g.get_repo(item["full_name"])
            response = repo.get_readme()
            #document.update({"meta": response.raw_data})
            
            document.update({"raw": requests.get(response.download_url).text })
            
            update_res = readmes_collection.update_one({"id": document["id"]}, {"$set": document}, upsert=True)
            modified_count += update_res.modified_count
            if update_res.upserted_id:
                upserted_count += 1
        except Exception as e:
            logger.error("repository id:{} caused: {}".format(document["id"], e))

    summary_str = '{} readmes, upserted {}, modified {}'.format(items.count(), upserted_count, modified_count)
    logger.info(summary_str)

    return {
        'statusCode': 200,
        'body': json.dumps('Success! ')
    }

if __name__ == "__main__":
    print(handle(None, None))
