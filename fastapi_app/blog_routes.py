from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db, User, Blog
from models import BlogCreate, BlogUpdate, Blog as BlogModel, BlogList
from dependencies import get_current_active_user, get_current_admin
from datetime import datetime
import re
import uuid

router = APIRouter()

def generate_slug(title: str) -> str:
    """Generate a URL-friendly slug from title"""
    # Convert to lowercase and replace spaces with hyphens
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    # Add random string to ensure uniqueness
    return f"{slug}-{str(uuid.uuid4())[:8]}"

def increment_view_count(blog_id: int, db: Session):
    """Increment view count for a blog"""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if blog:
        blog.view_count += 1
        db.commit()

# ==================== ADMIN BLOG ENDPOINTS ====================

@router.post("/admin/blogs/", response_model=BlogModel, status_code=status.HTTP_201_CREATED)
async def create_blog(
    blog: BlogCreate, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Create a new blog (admin only)"""
    # Generate slug if not provided
    if not blog.slug:
        blog.slug = generate_slug(blog.title)
    
    # Check if slug already exists
    existing_blog = db.query(Blog).filter(Blog.slug == blog.slug).first()
    if existing_blog:
        blog.slug = generate_slug(blog.title)  # Generate new unique slug
    
    # Create blog
    db_blog = Blog(
        title=blog.title,
        content=blog.content,
        excerpt=blog.excerpt,
        slug=blog.slug,
        featured_image=blog.featured_image,
        tags=blog.tags,
        is_published=blog.is_published,
        author_id=current_admin.id
    )
    
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    
    # Add author name to response
    db_blog.author_name = current_admin.name
    return db_blog

@router.get("/admin/blogs/", response_model=list[BlogList])
async def get_all_blogs_admin(
    skip: int = 0, 
    limit: int = 100, 
    published_only: bool = Query(False, description="Show only published blogs"),
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Get all blogs (admin only) - includes drafts"""
    query = db.query(Blog)
    
    if published_only:
        query = query.filter(Blog.is_published == True)
    
    blogs = query.offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs

@router.get("/admin/blogs/{blog_id}", response_model=BlogModel)
async def get_blog_admin(
    blog_id: int, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Get specific blog by ID (admin only) - includes drafts"""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    # Add author name
    author = db.query(User).filter(User.id == blog.author_id).first()
    blog.author_name = author.name if author else "Unknown"
    
    return blog

@router.put("/admin/blogs/{blog_id}", response_model=BlogModel)
async def update_blog_admin(
    blog_id: int, 
    blog_update: BlogUpdate, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Update blog (admin only)"""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    update_data = blog_update.dict(exclude_unset=True)
    
    # Handle slug generation if title is updated
    if "title" in update_data and not update_data.get("slug"):
        update_data["slug"] = generate_slug(update_data["title"])
    
    # Check slug uniqueness
    if "slug" in update_data:
        existing_blog = db.query(Blog).filter(
            Blog.slug == update_data["slug"], 
            Blog.id != blog_id
        ).first()
        if existing_blog:
            update_data["slug"] = generate_slug(update_data.get("title", blog.title))
    
    for field, value in update_data.items():
        setattr(blog, field, value)
    
    blog.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(blog)
    
    # Add author name
    author = db.query(User).filter(User.id == blog.author_id).first()
    blog.author_name = author.name if author else "Unknown"
    
    return blog

@router.delete("/admin/blogs/{blog_id}")
async def delete_blog_admin(
    blog_id: int, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Delete blog (admin only)"""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    db.delete(blog)
    db.commit()
    return {"message": "Blog deleted successfully"}

@router.get("/admin/blogs/search/")
async def search_blogs_admin(
    q: str = Query(..., description="Search query"),
    skip: int = 0, 
    limit: int = 10, 
    published_only: bool = Query(False, description="Search only published blogs"),
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Search blogs (admin only) - includes drafts"""
    query = db.query(Blog).filter(
        Blog.title.contains(q) | 
        Blog.content.contains(q) | 
        Blog.excerpt.contains(q) |
        Blog.tags.contains(q)
    )
    
    if published_only:
        query = query.filter(Blog.is_published == True)
    
    blogs = query.offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs

# ==================== MEMBER BLOG ENDPOINTS ====================

@router.get("/blogs/", response_model=list[BlogList])
async def get_published_blogs(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all published blogs (public)"""
    blogs = db.query(Blog).filter(
        Blog.is_published == True
    ).order_by(Blog.created_at.desc()).offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs

@router.get("/blogs/{blog_slug}", response_model=BlogModel)
async def get_blog_by_slug(blog_slug: str, db: Session = Depends(get_db)):
    """Get published blog by slug (public)"""
    blog = db.query(Blog).filter(
        Blog.slug == blog_slug,
        Blog.is_published == True
    ).first()
    
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    # Increment view count
    increment_view_count(blog.id, db)
    
    # Add author name
    author = db.query(User).filter(User.id == blog.author_id).first()
    blog.author_name = author.name if author else "Unknown"
    
    return blog

@router.get("/blogs/id/{blog_id}", response_model=BlogModel)
async def get_blog_by_id(blog_id: int, db: Session = Depends(get_db)):
    """Get published blog by ID (public)"""
    blog = db.query(Blog).filter(
        Blog.id == blog_id,
        Blog.is_published == True
    ).first()
    
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found"
        )
    
    # Increment view count
    increment_view_count(blog.id, db)
    
    # Add author name
    author = db.query(User).filter(User.id == blog.author_id).first()
    blog.author_name = author.name if author else "Unknown"
    
    return blog

@router.get("/blogs/search/")
async def search_published_blogs(
    q: str = Query(..., description="Search query"),
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    """Search published blogs (public)"""
    blogs = db.query(Blog).filter(
        Blog.is_published == True,
        Blog.title.contains(q) | 
        Blog.content.contains(q) | 
        Blog.excerpt.contains(q) |
        Blog.tags.contains(q)
    ).order_by(Blog.created_at.desc()).offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs

@router.get("/blogs/tags/{tag}")
async def get_blogs_by_tag(
    tag: str,
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    """Get published blogs by tag (public)"""
    blogs = db.query(Blog).filter(
        Blog.is_published == True,
        Blog.tags.contains(tag)
    ).order_by(Blog.created_at.desc()).offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs

@router.get("/blogs/author/{author_id}")
async def get_blogs_by_author(
    author_id: int,
    skip: int = 0, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    """Get published blogs by author (public)"""
    blogs = db.query(Blog).filter(
        Blog.is_published == True,
        Blog.author_id == author_id
    ).order_by(Blog.created_at.desc()).offset(skip).limit(limit).all()
    
    # Add author names
    for blog in blogs:
        author = db.query(User).filter(User.id == blog.author_id).first()
        blog.author_name = author.name if author else "Unknown"
    
    return blogs
