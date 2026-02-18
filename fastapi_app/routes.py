from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, User, Item, DatePlan, DatePlanCard, EmailSubscription, Product, ContactSubmission, Referral, Order, OrderItem, Event
from models import MemberCreate, AdminCreate, UserUpdate, User as UserModel, ItemCreate, ItemUpdate, Item as ItemModel, UserLogin, Token, PasswordChange, AdminPasswordReset, DatePlan as DatePlanModel, DatePlanCreate, DatePlanUpdate, DatePlanCard as DatePlanCardModel, DatePlanCardCreate, DatePlanCardUpdate, DatePlanCardList, EmailSubscribeCreate, EmailSubscribeList, EmailSubscribeItem, ProductCreate, Product as ProductModel, ProductList, ContactUsCreate, ContactUsList, ReferralCreate, ReferralList, CheckoutBody, OrderList, Event as EventModel, EventCreate, EventUpdate
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

# ==================== PASSWORD MANAGEMENT ====================

@router.put("/users/me/password")
async def change_my_password(
    password_change: PasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Change password for current user"""
    if not verify_password(password_change.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    current_user.hashed_password = get_password_hash(password_change.new_password)
    db.commit()
    return {"message": "Password updated"}

@router.put("/admin/users/{user_id}/password")
async def admin_reset_user_password(
    user_id: int,
    body: AdminPasswordReset,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """Admin resets a user's password"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    user.hashed_password = get_password_hash(body.new_password)
    db.commit()
    return {"message": "Password reset"}

# ==================== DATE PLANS ====================

@router.post("/dates/", response_model=DatePlanModel, status_code=status.HTTP_201_CREATED)
async def create_date_plan(
    body: DatePlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    date_plan = DatePlan(
        title=body.title,
        description=body.description,
        location=body.location,
        scheduled_at=body.scheduled_at,
        status=body.status or "planned",
        owner_id=current_user.id,
    )
    db.add(date_plan)
    db.commit()
    db.refresh(date_plan)
    return date_plan

@router.get("/dates/", response_model=list[DatePlanModel])
async def list_my_date_plans(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(DatePlan).filter(DatePlan.owner_id == current_user.id).order_by(DatePlan.scheduled_at.is_(None), DatePlan.scheduled_at.asc()).offset(skip).limit(limit).all()

@router.get("/admin/dates/", response_model=list[DatePlanModel])
async def list_all_date_plans_admin(
    skip: int = 0,
    limit: int = 200,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    return db.query(DatePlan).order_by(DatePlan.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/dates/{date_id}", response_model=DatePlanModel)
async def get_date_plan(date_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    dp = db.query(DatePlan).filter(DatePlan.id == date_id).first()
    if not dp or (dp.owner_id != current_user.id and current_user.role != "admin"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Date plan not found")
    return dp

@router.put("/dates/{date_id}", response_model=DatePlanModel)
async def update_date_plan(
    date_id: int,
    body: DatePlanUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    dp = db.query(DatePlan).filter(DatePlan.id == date_id).first()
    if not dp or (dp.owner_id != current_user.id and current_user.role != "admin"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Date plan not found")
    update_data = body.dict(exclude_unset=True)
    for f, v in update_data.items():
        setattr(dp, f, v)
    db.commit()
    db.refresh(dp)
    return dp

@router.delete("/dates/{date_id}")
async def delete_date_plan(date_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    dp = db.query(DatePlan).filter(DatePlan.id == date_id).first()
    if not dp or (dp.owner_id != current_user.id and current_user.role != "admin"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Date plan not found")
    db.delete(dp)
    db.commit()
    return {"message": "Date plan deleted"}

# ==================== DATE PLAN CARDS ====================

# Create (admin)
@router.post("/admin/dateplan-cards/", response_model=DatePlanCardModel, status_code=status.HTTP_201_CREATED)
async def create_dateplan_card(
    body: DatePlanCardCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    card = DatePlanCard(
        title=body.title,
        subtitle=body.subtitle,
        description=body.description,
        category=body.category,
        tags=body.tags,
        thumbnail_url=body.thumbnail_url,
        price=body.price,
        currency=body.currency,
        status=body.status,
        is_featured=body.is_featured,
        popularity=body.popularity,
        owner_id=current_admin.id,
    )
    db.add(card)
    db.commit()
    db.refresh(card)
    return card

# Retrieve single (public: only published; admin: any)
@router.get("/dateplan-cards/{card_id}", response_model=DatePlanCardModel)
async def get_dateplan_card(card_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    card = db.query(DatePlanCard).filter(DatePlanCard.id == card_id).first()
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    if current_user.role != "admin" and card.status != "published":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    return card

@router.get("/dateplan-cards/public/{card_id}", response_model=DatePlanCardList)
async def get_dateplan_card_public(card_id: int, db: Session = Depends(get_db)):
    card = db.query(DatePlanCard).filter(DatePlanCard.id == card_id, DatePlanCard.status == "published").first()
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    return card

# Update (admin)
@router.put("/admin/dateplan-cards/{card_id}", response_model=DatePlanCardModel)
async def update_dateplan_card(
    card_id: int,
    body: DatePlanCardUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    card = db.query(DatePlanCard).filter(DatePlanCard.id == card_id).first()
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    update_data = body.dict(exclude_unset=True)
    for f, v in update_data.items():
        setattr(card, f, v)
    db.commit()
    db.refresh(card)
    return card

# Delete (admin)
@router.delete("/admin/dateplan-cards/{card_id}")
async def delete_dateplan_card(card_id: int, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    card = db.query(DatePlanCard).filter(DatePlanCard.id == card_id).first()
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    db.delete(card)
    db.commit()
    return {"message": "Card deleted"}

# List for SalesPage (public-like, limited fields, only published)
@router.get("/dateplan-cards/", response_model=list[DatePlanCardList])
async def list_dateplan_cards_sales(
    q: str | None = None,
    category: str | None = None,
    tag: str | None = None,
    is_featured: bool | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    sort: str = "popularity_desc",  # popularity_desc | newest | price_asc | price_desc
    skip: int = 0,
    limit: int = 24,
    db: Session = Depends(get_db)
):
    query = db.query(DatePlanCard).filter(DatePlanCard.status == "published")
    if q:
        like = f"%{q}%"
        query = query.filter((DatePlanCard.title.ilike(like)) | (DatePlanCard.subtitle.ilike(like)) | (DatePlanCard.description.ilike(like)))
    if category:
        query = query.filter(DatePlanCard.category == category)
    if tag:
        query = query.filter(DatePlanCard.tags.contains(tag))
    if is_featured is not None:
        query = query.filter(DatePlanCard.is_featured == is_featured)
    if min_price is not None:
        query = query.filter(DatePlanCard.price >= min_price)
    if max_price is not None:
        query = query.filter(DatePlanCard.price <= max_price)
    if sort == "popularity_desc":
        query = query.order_by(DatePlanCard.is_featured.desc(), DatePlanCard.popularity.desc(), DatePlanCard.created_at.desc())
    elif sort == "newest":
        query = query.order_by(DatePlanCard.created_at.desc())
    elif sort == "price_asc":
        query = query.order_by(DatePlanCard.price.asc())
    elif sort == "price_desc":
        query = query.order_by(DatePlanCard.price.desc())
    cards = query.offset(skip).limit(limit).all()
    return cards

# List for Admin (full fields, any status)
@router.get("/admin/dateplan-cards/", response_model=list[DatePlanCardModel])
async def list_dateplan_cards_admin(
    q: str | None = None,
    status_filter: str | None = None,  # draft|published|archived
    category: str | None = None,
    owner_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    query = db.query(DatePlanCard)
    if q:
        like = f"%{q}%"
        query = query.filter((DatePlanCard.title.ilike(like)) | (DatePlanCard.subtitle.ilike(like)) | (DatePlanCard.description.ilike(like)))
    if status_filter:
        query = query.filter(DatePlanCard.status == status_filter)
    if category:
        query = query.filter(DatePlanCard.category == category)
    if owner_id is not None:
        query = query.filter(DatePlanCard.owner_id == owner_id)
    cards = query.order_by(DatePlanCard.created_at.desc()).offset(skip).limit(limit).all()
    return cards

# ==================== EMAIL SUBSCRIPTIONS ====================

@router.post("/emailsubscribe")
async def create_email_subscription(body: EmailSubscribeCreate, db: Session = Depends(get_db)):
    existing = db.query(EmailSubscription).filter(EmailSubscription.email == body.email).first()
    if existing:
        return {"message": "Already subscribed"}
    rec = EmailSubscription(email=body.email)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return {"message": "Subscribed"}

@router.get("/emailsubscribe", response_model=EmailSubscribeList)
async def list_email_subscriptions(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    total = db.query(EmailSubscription).count()
    items = db.query(EmailSubscription).order_by(EmailSubscription.created_at.desc()).offset(offset).limit(limit).all()
    # Coerce to list of EmailSubscribeItem via Pydantic by returning as response model
    return {
        "data": items,
        "total": total,
        "limit": limit,
        "offset": offset,
    }

# ==================== PRODUCTS ====================

@router.get("/product", response_model=ProductList)
async def list_products(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    total = db.query(Product).count()
    items = db.query(Product).order_by(Product.created_at.desc()).offset(offset).limit(limit).all()
    return {"data": items, "total": total, "limit": limit, "offset": offset}

@router.post("/product", response_model=ProductModel, status_code=status.HTTP_201_CREATED)
async def create_product(body: ProductCreate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    existing = db.query(Product).filter(Product.code == body.code).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product code already exists")
    prod = Product(
        code=body.code,
        name=body.name,
        image=body.image,
        price=body.price,
        acidity=body.acidity,
        roast=body.roast,
        processing=body.processing,
        description=body.description,
        category=body.category,
        promo=body.promo,
    )
    db.add(prod)
    db.commit()
    db.refresh(prod)
    return prod

@router.get("/product/code/{code}", response_model=ProductModel)
async def get_product_by_code(code: str, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.code == code).first()
    if not prod:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return prod

@router.delete("/product/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    prod = db.query(Product).filter(Product.id == product_id).first()
    if not prod:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    db.delete(prod)
    db.commit()
    return {"message": "Product deleted"}

# ==================== CONTACT US ====================

@router.post("/contactus")
async def create_contact_submission(body: ContactUsCreate, db: Session = Depends(get_db)):
    rec = ContactSubmission(email=body.email, name=body.name, phone=body.phone, message=body.message)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return {"message": "Received"}

@router.get("/contactus", response_model=ContactUsList)
async def list_contact_submissions(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    total = db.query(ContactSubmission).count()
    items = db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).offset(offset).limit(limit).all()
    return {"data": items, "total": total, "limit": limit, "offset": offset}

# ==================== REFERRALS ====================

@router.post("/referrals")
async def create_referral(body: ReferralCreate, db: Session = Depends(get_db)):
    rec = Referral(referrer_email=body.referrer_email, referee_email=body.referee_email, code=body.code)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return {"message": "Referral created"}

@router.get("/referrals", response_model=ReferralList)
async def list_referrals(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    total = db.query(Referral).count()
    items = db.query(Referral).order_by(Referral.created_at.desc()).offset(offset).limit(limit).all()
    return {"data": items, "total": total, "limit": limit, "offset": offset}

# ==================== SALES / ORDERS ====================

@router.post("/checkout")
async def checkout(body: CheckoutBody, db: Session = Depends(get_db)):
    order = Order(
        user_email=body.email,
        address=body.address,
        mobile=body.mobile,
        status=body.status,
        total=body.total,
        shipping=body.shipping,
    )
    db.add(order)
    db.flush()
    for it in body.products:
        db.add(OrderItem(order_id=order.id, product_code=it.code, price=it.price, quantity=it.quantity))
    db.commit()
    return {"message": "Checkout received", "order_id": order.id}

@router.get("/sales/history", response_model=OrderList)
async def sales_history(limit: int = 50, offset: int = 0, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    q = db.query(Order).filter(Order.user_email == current_user.email)
    total = q.count()
    orders = q.order_by(Order.created_at.desc()).offset(offset).limit(limit).all()
    def map_order(o: Order):
        return {
            "id": o.id,
            "user_email": o.user_email,
            "address": o.address,
            "mobile": o.mobile,
            "status": o.status,
            "total": o.total,
            "shipping": o.shipping,
            "created_at": o.created_at,
            "items": [{"product_code": i.product_code, "price": i.price, "quantity": i.quantity} for i in o.items],
        }
    data = [map_order(o) for o in orders]
    return {"data": data, "total": total, "limit": limit, "offset": offset}

@router.get("/admin/sales", response_model=OrderList)
async def admin_sales(limit: int = 100, offset: int = 0, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    q = db.query(Order)
    total = q.count()
    orders = q.order_by(Order.created_at.desc()).offset(offset).limit(limit).all()
    def map_order(o: Order):
        return {
            "id": o.id,
            "user_email": o.user_email,
            "address": o.address,
            "mobile": o.mobile,
            "status": o.status,
            "total": o.total,
            "shipping": o.shipping,
            "created_at": o.created_at,
            "items": [{"product_code": i.product_code, "price": i.price, "quantity": i.quantity} for i in o.items],
        }
    data = [map_order(o) for o in orders]
    return {"data": data, "total": total, "limit": limit, "offset": offset}

# ==================== EVENTS ====================

@router.get("/events/", response_model=list[EventModel])
async def public_events(db: Session = Depends(get_db)):
    return db.query(Event).order_by(Event.sequence.asc(), Event.created_at.desc()).all()

@router.get("/events/{event_id}", response_model=EventModel)
async def public_event_detail(event_id: int, db: Session = Depends(get_db)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return ev

@router.get("/admin/events/", response_model=list[EventModel])
async def admin_events(db: Session = Depends(get_db)):
    return db.query(Event).order_by(Event.created_at.desc()).all()

@router.post("/admin/events/", response_model=EventModel, status_code=status.HTTP_201_CREATED)
async def admin_create_event(body: EventCreate, db: Session = Depends(get_db)):
    ev = Event(
        title=body.title,
        description=body.description,
        date=body.date,
        location=body.location,
        image_url=body.image_url,
        sequence=body.sequence,
    )
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return ev

@router.put("/admin/events/{event_id}", response_model=EventModel)
async def admin_update_event(event_id: int, body: EventUpdate, db: Session = Depends(get_db)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    update_data = body.dict(exclude_unset=True)
    for k, v in update_data.items():
        setattr(ev, k, v)
    db.commit()
    db.refresh(ev)
    return ev

@router.delete("/admin/events/{event_id}")
async def admin_delete_event(event_id: int, db: Session = Depends(get_db)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    db.delete(ev)
    db.commit()
    return {"message": "Event deleted"}

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
