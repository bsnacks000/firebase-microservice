from motor.motor_asyncio import AsyncIOMotorDatabase
from .models import TaskInCreate, Task
from .mongodb.collections import UserMeta
from typing import List, Optional


async def create_user(db: AsyncIOMotorDatabase, task: TaskInCreate) -> Task:
    dbtask = Task(**task.dict())
    
    # if not dbuser.image_url:
    #     dbuser.image_url = await _generate_gravatar_ideticon_url(dbuser.email)
    row = await db[UserMeta.users.name].insert_one(dbtask.dict(to_mongo="write"))

    dbtask.id = row.inserted_id

    return dbuser
