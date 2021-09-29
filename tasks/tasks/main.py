from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

from .routes import router as api_router
# from .core.errors import http_422_error_handler, http_error_handler, validation_exception_handler
from .mongodb.connection import close_mongo_connection, connect_to_mongo, create_index_for_collections

API_V1_STR = "/v1"

app = FastAPI(title="tasks",
            version="0.0.0",
            description="backend api for tasks app")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*", # XXX need to fix this boi
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"])

app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

app.include_router(api_router, prefix=API_V1_STR)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": f"Welcome to Tasks API!"}