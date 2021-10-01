from motor.motor_asyncio import AsyncIOMotorDatabase
from .models import TaskInCreate, Task
from .mongodb.collections import TaskMeta
from typing import List, Optional


async def create_task(db: AsyncIOMotorDatabase, task: TaskInCreate, username: str) -> Task:
    dbtask = Task(**task.dict(), username=username)
    
    # if not dbuser.image_url:
    #     dbuser.image_url = await _generate_gravatar_ideticon_url(dbuser.email)
    row = await db[TaskMeta.tasks.name].insert_one(dbtask.dict(to_mongo="write"))

    dbtask.id = row.inserted_id

    return dbtask

async def get_tasks(db: AsyncIOMotorDatabase) -> List[Task]:
    rows = db[TaskMeta.tasks.name].find()
    return [Task(**row) for row in await rows.to_list(length=100)]