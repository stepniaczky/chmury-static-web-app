from pymongo import MongoClient
from fastapi import HTTPException
from dotenv import dotenv_values
from core.settings import CONFIG_ENV


def config():

    if 'CONN_STRING' not in CONFIG_ENV or 'DB' not in CONFIG_ENV:
        raise HTTPException(
            status_code=500, detail='MongoDB connection string or database name not found in env file')


def get_client():
    try:
        return MongoClient(CONFIG_ENV['CONN_STRING'])
    except Exception:
        raise HTTPException(status_code=500, detail='MongoDB connection error')


def get_collection(collection_name):
    db = get_client()[CONFIG_ENV['DB']]
    if collection_name not in db.list_collection_names():
        db.command({'customAction': "CreateCollection",
                   'collection': collection_name})
        print("Created collection {}". format(collection_name))

    return db[collection_name]
