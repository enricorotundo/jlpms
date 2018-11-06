from github import Github
from pymongo import MongoClient
import datetime
import json

# dirty stuff, move into .env
dbuser = ''
dbpassword = ''
conn_string = "".format(dbuser, dbpassword)
github_access_token = ""


client = MongoClient(conn_string)


db = client['jlpms']
collection = db['raw_items']


g = Github(github_access_token)
query = "topic:jupyterlab-extension"
response = g.search_repositories(query=query)



day_item = {
    "date": datetime.date.today().isoformat(),
    "items": []
}



for repo in response:
    #print(repo.id)
    day_item["items"].append(repo.raw_data)

    


print("started insert")
collection.insert_one(day_item)
print("finished insert")

