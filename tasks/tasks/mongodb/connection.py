import logging
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from ..config import MONGO_URL, MONGO_DB
from .db import db
from .collections import CollectionWrapper, TaskMeta

async def connect_to_mongo():
    logging.info("Connecting to mongodb...")
    db.client = AsyncIOMotorClient(MONGO_URL)
    logging.info("Connection to mongodb estatblished.")

async def create_index_for_collections():
    mongo_wrapper = CollectionWrapper(db.client[MONGO_DB])
    for collection in TaskMeta:
        logging.info(f"creating index for {collection.value[0]}")
        await mongo_wrapper.create_unique_index(*collection.value)


async def close_mongo_connection():
    logging.info("Closing connection to mongodb...")
    db.client.close()
    logging.info("Connection to mongodb closed.")