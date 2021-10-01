from fastapi import APIRouter, Body, Depends, Path
from motor.motor_asyncio import AsyncIOMotorDatabase
from starlette.exceptions import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED


import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials

from .models import UserInCreate, User, UsersInRespone
from .mongodb.db import get_database
from .auth import get_current_user, FirebaseCustomClaims
from . import crud
from .config import FIREBASE_CRED_FILE

router = APIRouter()

# XXX remove async later
# XXX need some finagling for initial admin account
@router.post("/users", response_model=User, tags=["users"])
async def create_user(user: UserInCreate = Body(..., embed=True), 
                        authorized_user: FirebaseCustomClaims = Depends(get_current_user),
                        db: AsyncIOMotorDatabase = Depends(get_database)):
    
    if authorized_user.role != 'admin':
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED,detail=f"You do not permission to create user.")

    # XXX make this depends
    cred = credentials.Certificate(FIREBASE_CRED_FILE)
    firebase_app = firebase_admin.initialize_app(cred)

    # XXX try and raise error for this boi
    fireuser = auth.create_user(email= user.email, email_verified=False, password=user.password,
                                    display_name=user.display_name, disabled=False)
    auth.set_custom_user_claims(fireuser.uid, {'role': user.role})

    user.firebase_id= fireuser.uid
    user = await crud.create_user(db, user, created_by=authorized_user.display_name)
    return user

# XXX only here to make it easier to init admin users, should be removed in production or make it into cli
@router.post("/admin", response_model=User, tags=["users"])
async def create_admin_user(user: UserInCreate = Body(..., embed=True),
                        db: AsyncIOMotorDatabase = Depends(get_database)):
    
    # XXX make this depends
    # cred = credentials.Certificate(FIREBASE_CRED_FILE)
    # firebase_app = firebase_admin.initialize_app(cred)

    # XXX try and raise error for this boi
    fireuser = auth.create_user(email= user.email, email_verified=False, password=user.password,
                                    display_name=user.display_name, disabled=False)
    auth.set_custom_user_claims(fireuser.uid, {'role': user.role})

    user.firebase_id= fireuser.uid
    user = await crud.create_user(db, user)
    return user

@router.get("/currentuser/", response_model=User, tags=["users"])
async def get_current_authorized_user(current_user: FirebaseCustomClaims = Depends(get_current_user),
                                        db: AsyncIOMotorDatabase = Depends(get_database)):
    authorized_user = await crud.get_user_by_firebase_id(db, current_user.user_id)
    return authorized_user

@router.get("/users/{username}", response_model=User, tags=["users"])
async def get_user(username: str, current_user: FirebaseCustomClaims = Depends(get_current_user),
                                                db: AsyncIOMotorDatabase = Depends(get_database)):
    
    # current_user = await user_crud.get_user_by_firebase_userid(db, current_user.user_id)
    user = await crud.get_user_by_username(db, username)
    return user

@router.get("/users/", response_model=UsersInRespone, tags=["users"])
async def get_list_of_users(current_user: FirebaseCustomClaims = Depends(get_current_user),
                                                db: AsyncIOMotorDatabase = Depends(get_database)):
    
    # current_user = await user_crud.get_user_by_firebase_userid(db, current_user.user_id)
    users = await crud.get_users(db)
    return UsersInRespone(users=users)