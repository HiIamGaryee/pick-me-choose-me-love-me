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

# Password change models
class PasswordChange(BaseModel):
    current_password: str
    new_password: str

class AdminPasswordReset(BaseModel):
    new_password: str

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

# Date Plan Models
class DatePlanBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = "planned"

class DatePlanCreate(DatePlanBase):
    pass

class DatePlanUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = None

class DatePlan(DatePlanBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

# DatePlanCard Models
class DatePlanCardBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    thumbnail_url: Optional[str] = None
    price: float = 0.0
    currency: str = "USD"
    status: str = "draft"  # draft | published | archived
    is_featured: bool = False
    popularity: int = 0

class DatePlanCardCreate(DatePlanCardBase):
    pass

class DatePlanCardUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    thumbnail_url: Optional[str] = None
    price: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    popularity: Optional[int] = None

class DatePlanCard(DatePlanCardBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: Optional[int] = None

    class Config:
        from_attributes = True

class DatePlanCardList(BaseModel):
    id: int
    title: str
    subtitle: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    thumbnail_url: Optional[str] = None
    price: float
    currency: str
    is_featured: bool
    popularity: int
    created_at: datetime

    class Config:
        from_attributes = True

# Email Subscription Models
class EmailSubscribeCreate(BaseModel):
    email: EmailStr

class EmailSubscribeItem(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

class EmailSubscribeList(BaseModel):
    data: list[EmailSubscribeItem]
    total: int
    limit: int
    offset: int

# Product Models
class ProductCreate(BaseModel):
    code: str
    name: str
    image: Optional[str] = None
    price: float
    acidity: Optional[str] = None
    roast: Optional[str] = None
    processing: Optional[str] = None
    description: str
    category: str
    promo: Optional[str] = None

class Product(BaseModel):
    id: int
    code: str
    name: str
    image: Optional[str] = None
    price: float
    acidity: Optional[str] = None
    roast: Optional[str] = None
    processing: Optional[str] = None
    description: str
    category: str
    promo: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ProductList(BaseModel):
    data: list[Product]
    total: int
    limit: int
    offset: int

# Contact Us
class ContactUsCreate(BaseModel):
    email: EmailStr
    name: str
    phone: str
    message: str

class ContactUsItem(BaseModel):
    id: int
    email: EmailStr
    name: str
    phone: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class ContactUsList(BaseModel):
    data: list[ContactUsItem]
    total: int
    limit: int
    offset: int

# Referrals
class ReferralCreate(BaseModel):
    referrer_email: EmailStr
    referee_email: EmailStr
    code: str

class ReferralItem(BaseModel):
    id: int
    referrer_email: EmailStr
    referee_email: EmailStr
    code: str
    created_at: datetime

    class Config:
        from_attributes = True

class ReferralList(BaseModel):
    data: list[ReferralItem]
    total: int
    limit: int
    offset: int

# Sales / Orders
class OrderItemModel(BaseModel):
    product_code: str
    price: float
    quantity: int

class CheckoutBody(BaseModel):
    shipping: float
    total: float
    address: str
    mobile: str
    email: EmailStr
    status: str
    products: list[OrderItemModel]

class OrderModel(BaseModel):
    id: int
    user_email: EmailStr
    address: str
    mobile: str
    status: str
    total: float
    shipping: float
    created_at: datetime
    items: list[OrderItemModel]

    class Config:
        from_attributes = True

class OrderList(BaseModel):
    data: list[OrderModel]
    total: int
    limit: int
    offset: int

# Events
class EventCreate(BaseModel):
    title: str
    description: str
    date: datetime
    location: str
    image_url: Optional[str] = None
    sequence: int = 0

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    sequence: Optional[int] = None

class Event(BaseModel):
    id: int
    title: str
    description: str
    date: datetime
    location: str
    image_url: Optional[str] = None
    sequence: int
    created_at: datetime

    class Config:
        from_attributes = True
