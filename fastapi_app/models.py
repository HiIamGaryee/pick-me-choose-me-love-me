from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Models
class UserBase(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None

class MemberCreate(UserBase):
    password: str

class AdminCreate(UserBase):
    password: str
    role: str = "admin"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    age: Optional[int] = None

class User(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class UserInDB(User):
    hashed_password: str

# Item Models
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    is_available: bool = True

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    is_available: Optional[bool] = None

class Item(ItemBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Login Model
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Blog Models
class BlogBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = False

class BlogCreate(BlogBase):
    slug: Optional[str] = None  # Will be auto-generated if not provided

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    slug: Optional[str] = None

class Blog(BlogBase):
    id: int
    slug: str
    view_count: int
    created_at: datetime
    updated_at: datetime
    author_id: int
    author_name: Optional[str] = None

    class Config:
        from_attributes = True

class BlogList(BaseModel):
    id: int
    title: str
    excerpt: Optional[str] = None
    slug: str
    featured_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool
    view_count: int
    created_at: datetime
    updated_at: datetime
    author_name: Optional[str] = None

    class Config:
        from_attributes = True
