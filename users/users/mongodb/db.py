from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from ..config import MONGO_DB

class DataBase:
    client: AsyncIOMotorClient = None

db = DataBase()

async def get_database() -> AsyncIOMotorDatabase:
    return db.client[MONGO_DB]