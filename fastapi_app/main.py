from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables
from routes import router
from blog_routes import router as blog_router
import uvicorn
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="My FastAPI Application",
    description="A comprehensive REST API built with FastAPI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router, prefix="/api/v1")
app.include_router(blog_router, prefix="/api/v1")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI!",
        "docs": "/docs",
        "redoc": "/redoc",
        "version": "1.0.0",
        "endpoints": {
            "member_auth": "/api/v1/member/register, /api/v1/member/login",
            "admin_auth": "/api/v1/admin/login, /api/v1/admin/register",
            "profiles": "/api/v1/users/me, /api/v1/members/me, /api/v1/admins/me",
            "admin_management": "/api/v1/admin/users/, /api/v1/admin/search/users/",
            "member_management": "/api/v1/members/profile",
            "items": "/api/v1/items/",
            "search": "/api/v1/search/",
            "admin_blogs": "/api/v1/admin/blogs/ (CRUD operations)",
            "member_blogs": "/api/v1/blogs/ (read-only, published only)"
        }
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    create_tables()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
