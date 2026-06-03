from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True

class SessionBase(BaseModel):
    interview_type: str

class SessionCreate(SessionBase):
    pass

class Session(SessionBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ResponseBase(BaseModel):
    question: str
    answer_transcript: str
    grammar_score: float
    confidence_score: float
    relevance_score: float
    feedback: str


class ResponseCreate(ResponseBase):
    pass

class Response(ResponseBase):
    id: int
    session_id: int
    
    class Config:
        from_attributes = True
