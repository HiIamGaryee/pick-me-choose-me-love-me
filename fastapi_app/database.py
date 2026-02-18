from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Create engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    age = Column(Integer, nullable=True)
    hashed_password = Column(String)
    role = Column(String, default="member")  # "member" or "admin"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    items = relationship("Item", back_populates="owner")
    blogs = relationship("Blog", back_populates="author")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    price = Column(Float)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship
    owner = relationship("User", back_populates="items")

class Blog(Base):
    __tablename__ = "blogs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)  # Full blog content
    excerpt = Column(String, nullable=True)  # Short description
    slug = Column(String, unique=True, index=True)  # URL-friendly identifier
    featured_image = Column(String, nullable=True)  # Image URL
    tags = Column(String, nullable=True)  # Comma-separated tags
    is_published = Column(Boolean, default=False)  # Draft or published
    view_count = Column(Integer, default=0)  # Track views
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship
    author = relationship("User", back_populates="blogs")

class DatePlan(Base):
    __tablename__ = "date_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    location = Column(String, nullable=True)
    scheduled_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String, default="planned")  # planned | completed | cancelled
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User")

class DatePlanCard(Base):
    __tablename__ = "date_plan_cards"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String, nullable=True)
    description = Column(String, nullable=True)
    category = Column(String, index=True, nullable=True)
    tags = Column(String, nullable=True)  # comma-separated
    thumbnail_url = Column(String, nullable=True)
    price = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    status = Column(String, default="draft")  # draft | published | archived
    is_featured = Column(Boolean, default=False)
    popularity = Column(Integer, default=0)  # used for sorting on sales page
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    owner = relationship("User")

class EmailSubscription(Base):
    __tablename__ = "email_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    image = Column(String, nullable=True)
    price = Column(Float)
    acidity = Column(String, nullable=True)
    roast = Column(String, nullable=True)
    processing = Column(String, nullable=True)
    description = Column(String)
    category = Column(String, index=True)
    promo = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    name = Column(String)
    phone = Column(String)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Referral(Base):
    __tablename__ = "referrals"

    id = Column(Integer, primary_key=True, index=True)
    referrer_email = Column(String, index=True)
    referee_email = Column(String, index=True)
    code = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    address = Column(String)
    mobile = Column(String)
    status = Column(String, default="pending")
    total = Column(Float)
    shipping = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_code = Column(String, index=True)
    price = Column(Float)
    quantity = Column(Integer)
    order = relationship("Order", back_populates="items")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    date = Column(DateTime)
    location = Column(String)
    image_url = Column(String, nullable=True)
    sequence = Column(Integer, default=0, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)
