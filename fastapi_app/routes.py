from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, User, Item
from models import MemberCreate, AdminCreate, UserUpdate, User as UserModel, ItemCreate, ItemUpdate, Item as ItemModel, UserLogin, Token
from auth import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from dependencies import get_current_active_user, get_current_member, get_current_admin

router = APIRouter()

# ==================== MEMBER AUTHENTICATION ====================

@router.post("/member/register", response_model=UserModel, status_code=status.HTTP_201_CREATED)
async def register_member(member: MemberCreate, db: Session = Depends(get_db)):
    """Register a new member (public endpoint)"""
    # Check if user already exists
    db_user = db.query(User).filter(User.email == member.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new member
    hashed_password = get_password_hash(member.password)
    db_user = User(
        name=member.name,
        email=member.email,
        age=member.age,
        hashed_password=hashed_password,
        role="member"  # Explicitly set as member
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/member/login", response_model=Token)
async def login_member(member_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login as a member"""
    user = db.query(User).filter(User.email == member_credentials.email).first()
    if not user or not verify_password(member_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is a member
    if user.role != "member":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Member login required."
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# ==================== ADMIN AUTHENTICATION ====================

@router.post("/admin/login", response_model=Token)
async def login_admin(admin_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login as an admin"""
    user = db.query(User).filter(User.email == admin_credentials.email).first()
    if not user or not verify_password(admin_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is an admin
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin login required."
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/admin/register", response_model=UserModel, status_code=status.HTTP_201_CREATED)
async def register_admin(admin: AdminCreate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    """Register a new admin (admin-only endpoint)"""
    # Check if user already exists
    db_user = db.query(User).filter(User.email == admin.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new admin
    hashed_password = get_password_hash(admin.password)
    db_user = User(
        name=admin.name,
        email=admin.email,
        age=admin.age,
        hashed_password=hashed_password,
        role="admin"  # Explicitly set as admin
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ==================== USER PROFILE ENDPOINTS ====================

@router.get("/users/me", response_model=UserModel)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Get current user profile (works for both members and admins)"""
    return current_user

@router.get("/members/me", response_model=UserModel)
async def read_member_profile(current_member: User = Depends(get_current_member)):
    """Get current member profile"""
    return current_member

@router.get("/admins/me", response_model=UserModel)
async def read_admin_profile(current_admin: User = Depends(get_current_admin)):
    """Get current admin profile"""
    return current_admin

# ==================== USER MANAGEMENT (ADMIN ONLY) ====================

@router.get("/admin/users/", response_model=list[UserModel])
async def get_all_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    """Get all users (admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/admin/users/{user_id}", response_model=UserModel)
async def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    """Get specific user by ID (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.put("/admin/users/{user_id}", response_model=UserModel)
async def update_user_by_admin(
    user_id: int, 
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Update any user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user

@router.delete("/admin/users/{user_id}")
async def delete_user_by_admin(
    user_id: int, 
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Delete any user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Prevent admin from deleting themselves
    if user.id == current_admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

# ==================== MEMBER PROFILE MANAGEMENT ====================

@router.put("/members/profile", response_model=UserModel)
async def update_member_profile(
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_member: User = Depends(get_current_member)
):
    """Update member's own profile"""
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_member, field, value)
    
    db.commit()
    db.refresh(current_member)
    return current_member

@router.delete("/members/profile")
async def delete_member_account(
    db: Session = Depends(get_db),
    current_member: User = Depends(get_current_member)
):
    """Delete member's own account"""
    db.delete(current_member)
    db.commit()
    return {"message": "Account deleted successfully"}

# ==================== ITEM ENDPOINTS ====================

@router.post("/items/", response_model=ItemModel, status_code=status.HTTP_201_CREATED)
async def create_item(
    item: ItemCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create new item (both members and admins can create items)"""
    db_item = Item(**item.dict(), owner_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/items/", response_model=list[ItemModel])
async def get_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all items (public)"""
    items = db.query(Item).offset(skip).limit(limit).all()
    return items

@router.get("/items/{item_id}", response_model=ItemModel)
async def get_item(item_id: int, db: Session = Depends(get_db)):
    """Get specific item (public)"""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return item

@router.put("/items/{item_id}", response_model=ItemModel)
async def update_item(
    item_id: int, 
    item_update: ItemUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update item (owner or admin can update)"""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    # Allow owner or admin to update
    if item.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    
    db.commit()
    db.refresh(item)
    return item

@router.delete("/items/{item_id}")
async def delete_item(
    item_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete item (owner or admin can delete)"""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    # Allow owner or admin to delete
    if item.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}

# ==================== SEARCH ENDPOINTS ====================

@router.get("/search/")
async def search_items(q: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Search items by title/description (public)"""
    items = db.query(Item).filter(
        Item.title.contains(q) | Item.description.contains(q)
    ).offset(skip).limit(limit).all()
    return items

@router.get("/admin/search/users/")
async def search_users(q: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    """Search users by name/email (admin only)"""
    users = db.query(User).filter(
        User.name.contains(q) | User.email.contains(q)
    ).offset(skip).limit(limit).all()
    return users
