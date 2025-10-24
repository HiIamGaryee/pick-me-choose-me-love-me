#!/usr/bin/env python3
"""
Script to add sample blog data.
Run this script to populate the database with sample blogs.
"""

import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, User, Blog, create_tables
from datetime import datetime

def add_sample_blogs():
    """Add sample blog data"""
    # Create tables if they don't exist
    create_tables()
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Check if blogs already exist
        existing_blogs = db.query(Blog).count()
        if existing_blogs > 0:
            print(f"❌ {existing_blogs} blogs already exist!")
            return
        
        # Get an admin user to be the author
        admin_user = db.query(User).filter(User.role == "admin").first()
        if not admin_user:
            print("❌ No admin user found! Please create an admin first using create_admin.py")
            return
        
        print("📝 Adding sample blogs...")
        print("=" * 50)
        
        # Sample blog data
        sample_blogs = [
            {
                "title": "Getting Started with FastAPI",
                "content": """
# Getting Started with FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

## Key Features

- **Fast**: Very high performance, on par with NodeJS and Go
- **Fast to code**: Increase the speed to develop features by about 200% to 300%
- **Fewer bugs**: Reduce about 40% of human (developer) induced errors
- **Intuitive**: Great editor support with autocompletion
- **Easy**: Designed to be easy to use and learn
- **Short**: Minimize code duplication
- **Robust**: Get production-ready code with automatic interactive documentation

## Installation

```bash
pip install fastapi
pip install uvicorn[standard]
```

## Basic Example

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

## Running the Application

```bash
uvicorn main:app --reload
```

FastAPI will automatically generate interactive API documentation at `/docs` and `/redoc`.
                """,
                "excerpt": "Learn how to build modern APIs with FastAPI, a high-performance Python web framework.",
                "slug": "getting-started-with-fastapi",
                "featured_image": "https://fastapi.tiangolo.com/img/fastapi-logo.png",
                "tags": "python,fastapi,web-development,api",
                "is_published": True
            },
            {
                "title": "Building REST APIs with Python",
                "content": """
# Building REST APIs with Python

REST (Representational State Transfer) is an architectural style for designing networked applications. A REST API is an API that conforms to the constraints of REST architectural style.

## REST Principles

1. **Client-Server Architecture**: Separation of concerns
2. **Stateless**: Each request contains all necessary information
3. **Cacheable**: Responses must define themselves as cacheable or not
4. **Uniform Interface**: Consistent interface between components
5. **Layered System**: Hierarchical layers between components

## HTTP Methods

- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources
- **PATCH**: Partial updates

## Best Practices

1. Use meaningful URLs
2. Use proper HTTP status codes
3. Implement proper error handling
4. Use pagination for large datasets
5. Implement authentication and authorization
6. Version your API
7. Provide comprehensive documentation

## Example API Endpoints

```
GET    /api/v1/users/          # Get all users
GET    /api/v1/users/{id}      # Get specific user
POST   /api/v1/users/          # Create new user
PUT    /api/v1/users/{id}      # Update user
DELETE /api/v1/users/{id}      # Delete user
```
                """,
                "excerpt": "A comprehensive guide to building RESTful APIs using Python frameworks.",
                "slug": "building-rest-apis-with-python",
                "featured_image": "https://via.placeholder.com/800x400/0066cc/ffffff?text=REST+API",
                "tags": "python,rest,api,web-development",
                "is_published": True
            },
            {
                "title": "Database Design Best Practices",
                "content": """
# Database Design Best Practices

Good database design is crucial for the performance, scalability, and maintainability of your applications.

## Normalization

Normalization is the process of organizing data in a database to eliminate redundancy and improve data integrity.

### First Normal Form (1NF)
- Each column contains atomic values
- No repeating groups

### Second Normal Form (2NF)
- Must be in 1NF
- All non-key attributes are fully functionally dependent on the primary key

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Indexing Strategies

1. **Primary Keys**: Automatically indexed
2. **Foreign Keys**: Should be indexed for joins
3. **Frequently Queried Columns**: Add indexes
4. **Composite Indexes**: For multi-column queries

## Performance Optimization

1. **Query Optimization**: Use EXPLAIN to analyze queries
2. **Connection Pooling**: Reuse database connections
3. **Caching**: Implement appropriate caching strategies
4. **Partitioning**: Split large tables
5. **Archiving**: Move old data to separate tables

## Security Considerations

1. **Input Validation**: Sanitize all inputs
2. **SQL Injection Prevention**: Use parameterized queries
3. **Access Control**: Implement proper user permissions
4. **Encryption**: Encrypt sensitive data
5. **Audit Logging**: Track database access
                """,
                "excerpt": "Essential guidelines for designing efficient and secure databases.",
                "slug": "database-design-best-practices",
                "featured_image": "https://via.placeholder.com/800x400/28a745/ffffff?text=Database",
                "tags": "database,sql,design,performance",
                "is_published": True
            },
            {
                "title": "Authentication and Authorization in Web Applications",
                "content": """
# Authentication and Authorization in Web Applications

Understanding the difference between authentication and authorization is crucial for building secure web applications.

## Authentication vs Authorization

- **Authentication**: Verifying who the user is
- **Authorization**: Determining what the user can do

## Common Authentication Methods

### 1. Session-Based Authentication
- Server stores session data
- Client sends session ID
- Stateless on client side

### 2. Token-Based Authentication
- JWT (JSON Web Tokens)
- Stateless on both sides
- Self-contained tokens

### 3. OAuth 2.0
- Industry standard for authorization
- Third-party authentication
- Scoped access

## Security Best Practices

1. **Password Security**
   - Use strong password policies
   - Implement password hashing (bcrypt, scrypt)
   - Enable two-factor authentication

2. **Token Security**
   - Use HTTPS for token transmission
   - Implement token expiration
   - Secure token storage

3. **Session Security**
   - Use secure session cookies
   - Implement session timeout
   - Regenerate session IDs

## Implementation Example

```python
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```
                """,
                "excerpt": "Learn how to implement secure authentication and authorization in your web applications.",
                "slug": "authentication-authorization-web-applications",
                "featured_image": "https://via.placeholder.com/800x400/dc3545/ffffff?text=Security",
                "tags": "authentication,authorization,security,jwt",
                "is_published": True
            },
            {
                "title": "Microservices Architecture Patterns",
                "content": """
# Microservices Architecture Patterns

Microservices architecture is a method of developing software systems that tries to focus on building single-function modules with well-defined interfaces and operations.

## Benefits of Microservices

1. **Scalability**: Scale individual services independently
2. **Technology Diversity**: Use different technologies for different services
3. **Fault Isolation**: Failure in one service doesn't affect others
4. **Team Autonomy**: Teams can work independently
5. **Deployment Flexibility**: Deploy services independently

## Common Patterns

### 1. API Gateway Pattern
- Single entry point for all client requests
- Handles cross-cutting concerns
- Load balancing and routing

### 2. Database per Service
- Each service has its own database
- Prevents tight coupling
- Enables independent scaling

### 3. Saga Pattern
- Manages distributed transactions
- Compensating transactions
- Event-driven coordination

### 4. CQRS (Command Query Responsibility Segregation)
- Separate read and write models
- Optimized for different use cases
- Event sourcing integration

## Challenges

1. **Complexity**: More moving parts
2. **Network Latency**: Inter-service communication
3. **Data Consistency**: Distributed data management
4. **Testing**: End-to-end testing complexity
5. **Monitoring**: Distributed system monitoring

## Best Practices

1. **Domain-Driven Design**: Align services with business domains
2. **Service Communication**: Use asynchronous messaging
3. **Configuration Management**: Externalize configuration
4. **Monitoring**: Implement comprehensive logging
5. **Security**: Implement service-to-service authentication
                """,
                "excerpt": "Explore microservices architecture patterns and best practices for building scalable systems.",
                "slug": "microservices-architecture-patterns",
                "featured_image": "https://via.placeholder.com/800x400/6f42c1/ffffff?text=Microservices",
                "tags": "microservices,architecture,patterns,scalability",
                "is_published": False  # This one is a draft
            }
        ]
        
        # Add blogs to database
        for blog_data in sample_blogs:
            blog = Blog(
                title=blog_data["title"],
                content=blog_data["content"],
                excerpt=blog_data["excerpt"],
                slug=blog_data["slug"],
                featured_image=blog_data["featured_image"],
                tags=blog_data["tags"],
                is_published=blog_data["is_published"],
                author_id=admin_user.id,
                view_count=0
            )
            db.add(blog)
        
        db.commit()
        
        print("✅ Sample blogs added successfully!")
        print(f"📊 Added {len(sample_blogs)} blogs")
        print(f"👤 Author: {admin_user.name} ({admin_user.email})")
        print("\n📝 Blog Details:")
        for i, blog_data in enumerate(sample_blogs, 1):
            status = "Published" if blog_data["is_published"] else "Draft"
            print(f"{i}. {blog_data['title']} ({status})")
        
        print(f"\n🔗 Access blogs at:")
        print(f"Admin: http://localhost:8000/api/v1/admin/blogs/")
        print(f"Public: http://localhost:8000/api/v1/blogs/")
        
    except Exception as e:
        print(f"❌ Error adding sample blogs: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_sample_blogs()
