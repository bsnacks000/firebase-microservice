import collections
import enum
from collections import namedtuple
from typing import List, Tuple 
from motor.motor_asyncio import AsyncIOMotorDatabase

CollType = namedtuple('CollType', ['name', 'key', 'unique'])

class CollectionWrapper(object):

    def __init__(self, db: AsyncIOMotorDatabase):
        self._db = db  

    async def create_unique_index(self, collection: str='test', names: List[Tuple[str,str]]=[], unique: bool=False):
        if not names:
            return 
        tups = [(n,1) for n in names]
        await self._db[collection].drop_indexes()
        await self._db[collection].create_index(tups, unique=unique)
    
    @property
    def db(self):
        return self._db 

    def get_collection(self, name: str='test'):
        return self._db[name]

class TaskMeta(enum.Enum):

    tasks = CollType('tasks', ['user_id'], True)