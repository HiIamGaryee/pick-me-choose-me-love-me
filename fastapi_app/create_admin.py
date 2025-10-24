#!/usr/bin/env python3
"""
Script to create the first admin user.
Run this script to create an initial admin account.
"""

import sys
import os
from sqlalchemy.orm import Session
from database import SessionLocal, User, create_tables
from auth import get_password_hash

def create_first_admin():
    """Create the first admin user"""
    # Create tables if they don't exist
    create_tables()
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Check if any admin already exists
        existing_admin = db.query(User).filter(User.role == "admin").first()
        if existing_admin:
            print("❌ Admin user already exists!")
            print(f"Admin email: {existing_admin.email}")
            return
        
        # Get admin details from user input
        print("🔧 Creating first admin user...")
        print("=" * 50)
        
        name = input("Enter admin name: ").strip()
        email = input("Enter admin email: ").strip()
        password = input("Enter admin password: ").strip()
        age = input("Enter admin age (optional, press Enter to skip): ").strip()
        
        # Validate inputs
        if not name or not email or not password:
            print("❌ Name, email, and password are required!")
            return
        
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"❌ User with email {email} already exists!")
            return
        
        # Create admin user
        hashed_password = get_password_hash(password)
        admin_user = User(
            name=name,
            email=email,
            age=int(age) if age.isdigit() else None,
            hashed_password=hashed_password,
            role="admin"
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("✅ Admin user created successfully!")
        print(f"Admin ID: {admin_user.id}")
        print(f"Admin Name: {admin_user.name}")
        print(f"Admin Email: {admin_user.email}")
        print(f"Admin Role: {admin_user.role}")
        print("\n🔑 You can now login using:")
        print(f"POST /api/v1/admin/login")
        print(f"Email: {email}")
        print(f"Password: {password}")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_first_admin()
