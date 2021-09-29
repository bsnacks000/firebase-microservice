from pydantic import BaseModel, Field, BaseConfig, validator
from bson import ObjectId
import datetime
from typing import Union, List

class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class IDModelMixin(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id")
    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True

    def dict(cls, **kwargs):
        to_mongo = kwargs.pop("to_mongo") if "to_mongo" in kwargs else None
        if to_mongo:
            assert to_mongo in {"write", "update"}, "to_mongo must be set to 'write' or 'update'."
        dict_obj = super().dict(**kwargs)
        if to_mongo == "write": #assume that the initial object does not exist in mongo db collection
            dict_obj.pop("id")
        elif to_mongo == "update": #assume that the initial object exists in mongo db collection
            dict_obj["_id"] = dict_obj.pop("id")
        return dict_obj

class DateTimeModelMixin(BaseModel):
    created_at: datetime.datetime = None # type: ignore
    updated_at: datetime.datetime = None  # type: ignore

    @validator('created_at', 'updated_at', pre=True, always=True)
    def set_created_updated_at_now(cls, v):
        return v or datetime.datetime.now()


class RWModel(BaseModel):
    class Config(BaseConfig):
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
        extra = 'ignore'

class TaskInCreate(RWModel):
    body: str
    user_id: Union[PyObjectId, str]

class Task(IDModelMixin, DateTimeModelMixin):
    body: str
    user_id: PyObjectId
    
class TasksInResponse(RWModel):
    tasks: List[Task]