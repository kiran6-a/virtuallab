#!/usr/bin/env python3
"""
Database Viewer Script
This script helps you view the SQLite database tables and data
"""

from app import app, db, User
from sqlalchemy import inspect

def view_database():
    with app.app_context():
        print("=" * 50)
        print("DATABASE VIEWER")
        print("=" * 50)
        
        # Show all tables
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        print(f"\n📋 Tables in database: {tables}")
        
        # Show User table structure
        if 'user' in tables:
            print(f"\n🏗️  User table structure:")
            columns = inspector.get_columns('user')
            for col in columns:
                print(f"   • {col['name']}: {col['type']}")
        
        # Show all users
        users = User.query.all()
        print(f"\n👥 Total users: {len(users)}")
        
        if users:
            print(f"\n📊 User Data:")
            print("-" * 80)
            print(f"{'ID':<5} {'Username':<15} {'Email':<25} {'Created':<20}")
            print("-" * 80)
            for user in users:
                created_date = user.created_at.strftime("%Y-%m-%d %H:%M")
                print(f"{user.id:<5} {user.username:<15} {user.email:<25} {created_date:<20}")
        else:
            print("   No users found in database.")
        
        print("\n" + "=" * 50)

if __name__ == "__main__":
    view_database()
