from motor.motor_asyncio import AsyncIOMotorDatabase
from .models import UserInCreate, User
from .mongodb.collections import UserMeta
from typing import List, Optional


async def create_user(db: AsyncIOMotorDatabase, user: UserInCreate, created_by: Optional[str] = None) -> User:
    dbuser = User(**user.dict())
    dbuser.created_by = created_by

    # if not dbuser.image_url:
    #     dbuser.image_url = await _generate_gravatar_ideticon_url(dbuser.email)
    row = await db[UserMeta.users.name].insert_one(dbuser.dict(to_mongo="write"))

    dbuser.id = row.inserted_id

    return dbuser

async def get_user_by_username(db: AsyncIOMotorDatabase, target_username: str, current_username: Optional[str] = None) -> User:
    row = await db[UserMeta.users.name].find_one({"display_name": username})
    if not row:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=f"User {target_username} not found")
    return User(**row)

async def get_user_by_firebase_id(db: AsyncIOMotorDatabase, firebase_id: str) -> User:
    row = await db[UserMeta.users.name].find_one({"firebase_id": firebase_id})
    if not row:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=f"User with firebase id {firebase_id} not found")
    return User(**row)


async def get_users(db: AsyncIOMotorDatabase) -> List[User]:
    rows = db[UserMeta.users.name].find()
    return [User(**row) for row in await rows.to_list(length=50)]