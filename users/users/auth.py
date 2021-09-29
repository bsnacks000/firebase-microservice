from fastapi_cloudauth.firebase import FirebaseCurrentUser, FirebaseClaims
from .config import FIREBASE_PROJECT_ID
from pydantic import Field

class FirebaseCustomClaims(FirebaseClaims):
    display_name: str = Field(None, alias="name")
    role: str = Field(None, alias="role")

class FirebaseCurrentUserCustom(FirebaseCurrentUser):
    user_info = FirebaseCustomClaims

get_current_user = FirebaseCurrentUserCustom(
    project_id=FIREBASE_PROJECT_ID
)

get_current_user_optional = FirebaseCurrentUser(
    project_id=FIREBASE_PROJECT_ID, auto_error=False
)
