from fastapi import APIRouter, Body, Depends, Path
from motor.motor_asyncio import AsyncIOMotorDatabase
from starlette.exceptions import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED

from .models import TaskInCreate, Task, TasksInResponse
from .mongodb.db import get_database
from .auth import get_current_user, FirebaseCustomClaims
from . import crud

router = APIRouter()

# XXX remove async later
@router.post("/tasks", response_model=Task, tags=["tasks"])
async def create_task(task: TaskInCreate = Body(..., embed=True), 
                        authorized_user: FirebaseCustomClaims = Depends(get_current_user),
                        db: AsyncIOMotorDatabase = Depends(get_database)):
    username = authorized_user.display_name
    return await crud.create_task(db, task, username)


@router.get("/tasks/", response_model=TasksInResponse, tags=["tasks"])
async def get_tasks(authorized_user: FirebaseCustomClaims = Depends(get_current_user),
                    db: AsyncIOMotorDatabase = Depends(get_database)):
    tasks = await crud.get_tasks(db)
    return TasksInResponse(tasks=tasks)