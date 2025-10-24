# FastAPI REST API Project

A comprehensive REST API built with Python FastAPI, featuring user authentication, CRUD operations, and database integration.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for users and items
- **Database Integration**: SQLAlchemy ORM with support for SQLite, PostgreSQL, and MySQL
- **Data Validation**: Pydantic models for request/response validation
- **Security**: Password hashing, JWT tokens, and protected routes
- **API Documentation**: Automatic OpenAPI/Swagger documentation
- **Testing**: Comprehensive test suite with pytest
- **CORS Support**: Cross-origin resource sharing configuration

## 📁 Project Structure

```
fastapi_app/
├── main.py              # Main FastAPI application
├── database.py          # Database configuration and models
├── models.py            # Pydantic models for validation
├── routes.py            # API route definitions
├── auth.py              # Authentication utilities
├── dependencies.py      # Dependency injection functions
├── requirements.txt     # Python dependencies
├── env.example          # Environment variables template
├── test_main.py         # Test suite
└── README.md            # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### 1. Clone or Download the Project

```bash
# If you have git
git clone <repository-url>
cd fastapi_app

# Or download and extract the files to a directory
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

```bash
# Copy the environment template
cp env.example .env

# Edit .env file with your configuration
# At minimum, change the SECRET_KEY for production
```

### 5. Run the Application

```bash
# Development server with auto-reload
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Authentication System

The API uses role-based authentication with separate endpoints for members and admins:

### Member Authentication

- **Registration**: `POST /api/v1/member/register` (Public)
- **Login**: `POST /api/v1/member/login` (Public)

### Admin Authentication

- **Login**: `POST /api/v1/admin/login` (Public)
- **Registration**: `POST /api/v1/admin/register` (Admin-only)

### Role-Based Access Control

- **Members**: Can register themselves, manage their own profile, create/manage their items
- **Admins**: Can login, manage all users, create other admins, access admin-only endpoints

## 📚 API Endpoints

### Member Authentication

- `POST /api/v1/member/register` - Register a new member (public)
- `POST /api/v1/member/login` - Login as a member

### Admin Authentication

- `POST /api/v1/admin/login` - Login as an admin
- `POST /api/v1/admin/register` - Register a new admin (admin-only)

### User Profiles

- `GET /api/v1/users/me` - Get current user profile (any authenticated user)
- `GET /api/v1/members/me` - Get current member profile (members only)
- `GET /api/v1/admins/me` - Get current admin profile (admins only)

### Member Management

- `PUT /api/v1/members/profile` - Update member's own profile
- `DELETE /api/v1/members/profile` - Delete member's own account

### Admin Management (Admin Only)

- `GET /api/v1/admin/users/` - Get all users
- `GET /api/v1/admin/users/{user_id}` - Get specific user
- `PUT /api/v1/admin/users/{user_id}` - Update any user
- `DELETE /api/v1/admin/users/{user_id}` - Delete any user
- `GET /api/v1/admin/search/users/` - Search users

### Items

- `GET /api/v1/items/` - Get all items (public)
- `GET /api/v1/items/{item_id}` - Get specific item (public)
- `POST /api/v1/items/` - Create new item (authenticated users)
- `PUT /api/v1/items/{item_id}` - Update item (owner or admin)
- `DELETE /api/v1/items/{item_id}` - Delete item (owner or admin)

### Search

- `GET /api/v1/search/?q={query}` - Search items by title/description (public)

### Blog Management (Admin Only)

- `POST /api/v1/admin/blogs/` - Create new blog
- `GET /api/v1/admin/blogs/` - Get all blogs (including drafts)
- `GET /api/v1/admin/blogs/{blog_id}` - Get specific blog by ID
- `PUT /api/v1/admin/blogs/{blog_id}` - Update blog
- `DELETE /api/v1/admin/blogs/{blog_id}` - Delete blog
- `GET /api/v1/admin/blogs/search/` - Search blogs (including drafts)

### Blog Reading (Public)

- `GET /api/v1/blogs/` - Get all published blogs
- `GET /api/v1/blogs/{blog_slug}` - Get published blog by slug
- `GET /api/v1/blogs/id/{blog_id}` - Get published blog by ID
- `GET /api/v1/blogs/search/` - Search published blogs
- `GET /api/v1/blogs/tags/{tag}` - Get blogs by tag
- `GET /api/v1/blogs/author/{author_id}` - Get blogs by author

### System

- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint

## 🔐 Authentication Examples

The API uses JWT (JSON Web Tokens) for authentication with role-based access control:

### 1. Register a Member

```bash
curl -X POST "http://localhost:8000/api/v1/member/register" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword123",
       "age": 30
     }'
```

### 2. Login as Member

```bash
curl -X POST "http://localhost:8000/api/v1/member/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "securepassword123"
     }'
```

### 3. Login as Admin

```bash
curl -X POST "http://localhost:8000/api/v1/admin/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@example.com",
       "password": "adminpassword123"
     }'
```

### 4. Create First Admin

Before you can login as admin, you need to create the first admin user:

```bash
# Run the admin creation script
python create_admin.py
```

### 5. Use Authentication Tokens

Include the token in the Authorization header for protected endpoints:

```bash
# Member endpoints
curl -X GET "http://localhost:8000/api/v1/members/me" \
     -H "Authorization: Bearer YOUR_MEMBER_TOKEN"

# Admin endpoints
curl -X GET "http://localhost:8000/api/v1/admin/users/" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Blog endpoints
curl -X GET "http://localhost:8000/api/v1/blogs/"  # Get published blogs (public)
curl -X GET "http://localhost:8000/api/v1/blogs/getting-started-with-fastapi"  # Get blog by slug
curl -X GET "http://localhost:8000/api/v1/blogs/search/?q=python"  # Search blogs
curl -X GET "http://localhost:8000/api/v1/blogs/tags/python"  # Get blogs by tag

# Admin blog management
curl -X POST "http://localhost:8000/api/v1/admin/blogs/" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "My New Blog Post",
       "content": "This is the full blog content...",
       "excerpt": "Short description of the blog",
       "tags": "python,web-development",
       "is_published": true
     }'
```

## 🗄️ Database Configuration

### SQLite (Default)

The application uses SQLite by default, which requires no additional setup.

### PostgreSQL

1. Install PostgreSQL
2. Create a database
3. Update `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost/dbname
```

### MySQL

1. Install MySQL
2. Create a database
3. Update `.env` file:

```
DATABASE_URL=mysql://username:password@localhost/dbname
```

## 🧪 Testing

Run the test suite:

```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run tests
pytest test_main.py -v
```

## 📖 Example Usage

### Create an Item (Protected Route)

```bash
curl -X POST "http://localhost:8000/api/v1/items/" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Awesome Product",
       "description": "This is an awesome product",
       "price": 29.99,
       "is_available": true
     }'
```

### Search Items

```bash
curl -X GET "http://localhost:8000/api/v1/search/?q=awesome&skip=0&limit=10"
```

## 🔧 Configuration

### Environment Variables

| Variable                      | Description                | Default                                |
| ----------------------------- | -------------------------- | -------------------------------------- |
| `DATABASE_URL`                | Database connection string | `sqlite:///./test.db`                  |
| `SECRET_KEY`                  | JWT secret key             | `your-secret-key-change-in-production` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time      | `30`                                   |
| `DEBUG`                       | Debug mode                 | `True`                                 |

### CORS Configuration

Update the CORS settings in `main.py` for production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specific domains
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

## 🚀 Production Deployment

### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Using Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation at `/docs`
2. Review the test cases in `test_main.py`
3. Check the logs for error messages
4. Ensure all dependencies are installed correctly

## 🔄 Next Steps

Consider adding these features:

- **Email Verification**: Send verification emails during registration
- **Password Reset**: Forgot password functionality
- **File Upload**: Handle file uploads
- **Rate Limiting**: Prevent API abuse
- **Caching**: Redis integration for better performance
- **Logging**: Structured logging with loguru
- **Monitoring**: Health checks and metrics
- **API Versioning**: Multiple API versions support

---

Happy coding! 🎉
