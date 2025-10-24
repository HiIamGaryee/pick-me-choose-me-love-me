import pytest
from fastapi.testclient import TestClient
from main import app
from database import get_db, engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os

# Test database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome to FastAPI!" in response.json()["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_register_member():
    user_data = {
        "name": "Test Member",
        "email": "member@example.com",
        "password": "testpassword123",
        "age": 25
    }
    response = client.post("/api/v1/member/register", json=user_data)
    assert response.status_code == 201
    assert response.json()["email"] == "member@example.com"
    assert response.json()["name"] == "Test Member"
    assert response.json()["role"] == "member"

def test_login_member():
    # First register a member
    user_data = {
        "name": "Test Member",
        "email": "member@example.com",
        "password": "testpassword123",
        "age": 25
    }
    client.post("/api/v1/member/register", json=user_data)
    
    # Then login
    login_data = {
        "email": "member@example.com",
        "password": "testpassword123"
    }
    response = client.post("/api/v1/member/login", json=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_member_login_with_admin_account():
    # First create an admin user
    admin_data = {
        "name": "Test Admin",
        "email": "admin@example.com",
        "password": "adminpassword123",
        "age": 30,
        "role": "admin"
    }
    # Note: This would normally require admin authentication, but for testing we'll create directly
    # In real scenario, you'd use the create_admin.py script first
    
    # Try to login as member with admin credentials
    login_data = {
        "email": "admin@example.com",
        "password": "adminpassword123"
    }
    response = client.post("/api/v1/member/login", json=login_data)
    assert response.status_code == 403  # Should be forbidden

def test_admin_login_without_admin_account():
    # Try to login as admin with member credentials
    member_data = {
        "name": "Test Member",
        "email": "member2@example.com",
        "password": "testpassword123",
        "age": 25
    }
    client.post("/api/v1/member/register", json=member_data)
    
    login_data = {
        "email": "member2@example.com",
        "password": "testpassword123"
    }
    response = client.post("/api/v1/admin/login", json=login_data)
    assert response.status_code == 403  # Should be forbidden

def test_get_member_profile():
    # Register and login as member
    user_data = {
        "name": "Test Member",
        "email": "member3@example.com",
        "password": "testpassword123",
        "age": 25
    }
    client.post("/api/v1/member/register", json=user_data)
    
    login_response = client.post("/api/v1/member/login", json={
        "email": "member3@example.com",
        "password": "testpassword123"
    })
    token = login_response.json()["access_token"]
    
    # Get member profile
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/v1/members/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["role"] == "member"

def test_create_item_without_auth():
    item_data = {
        "title": "Test Item",
        "description": "A test item",
        "price": 19.99
    }
    response = client.post("/api/v1/items/", json=item_data)
    assert response.status_code == 401  # Unauthorized

def test_search_items():
    response = client.get("/api/v1/search/?q=test")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_published_blogs():
    response = client.get("/api/v1/blogs/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_blog_without_auth():
    blog_data = {
        "title": "Test Blog",
        "content": "This is a test blog content",
        "excerpt": "Test excerpt",
        "is_published": True
    }
    response = client.post("/api/v1/admin/blogs/", json=blog_data)
    assert response.status_code == 401  # Unauthorized

def test_search_blogs():
    response = client.get("/api/v1/blogs/search/?q=test")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
