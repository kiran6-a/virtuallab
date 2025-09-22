#!/usr/bin/env python3
"""
SQLite Database Viewer
Run this script to view your database tables and data
"""

import sqlite3
import os
from datetime import datetime

def view_database():
    db_path = "virtuallab.db"
    
    if not os.path.exists(db_path):
        print("❌ Database file 'virtuallab.db' not found!")
        print("💡 Make sure to run your Flask app first to create the database.")
        return
    
    print("=" * 60)
    print("🗄️  SQLite DATABASE VIEWER")
    print("=" * 60)
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print(f"\n📋 Tables found: {len(tables)}")
        for table in tables:
            print(f"   • {table[0]}")
        
        # View User table specifically
        if any('user' in table[0].lower() for table in tables):
            print(f"\n👥 USER TABLE DATA:")
            print("-" * 80)
            
            # Get table structure
            cursor.execute("PRAGMA table_info(user);")
            columns = cursor.fetchall()
            print("📊 Table Structure:")
            for col in columns:
                print(f"   • {col[1]} ({col[2]}) - {'NOT NULL' if col[3] else 'NULL'} - {'PK' if col[5] else ''}")
            
            # Get all users
            cursor.execute("SELECT * FROM user;")
            users = cursor.fetchall()
            
            print(f"\n📈 Total Users: {len(users)}")
            if users:
                print("\n" + "-" * 80)
                print(f"{'ID':<5} {'Username':<15} {'Email':<25} {'Created':<20}")
                print("-" * 80)
                for user in users:
                    user_id, username, email, password_hash, created_at = user
                    # Format the datetime
                    if created_at:
                        try:
                            dt = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                            formatted_date = dt.strftime("%Y-%m-%d %H:%M")
                        except:
                            formatted_date = str(created_at)[:19]
                    else:
                        formatted_date = "N/A"
                    
                    print(f"{user_id:<5} {username:<15} {email:<25} {formatted_date:<20}")
            else:
                print("   No users found.")
        
        # Show other tables if they exist
        for table in tables:
            if 'user' not in table[0].lower():
                print(f"\n📊 {table[0].upper()} TABLE:")
                cursor.execute(f"SELECT COUNT(*) FROM {table[0]};")
                count = cursor.fetchone()[0]
                print(f"   Total records: {count}")
                
                if count > 0:
                    cursor.execute(f"SELECT * FROM {table[0]} LIMIT 5;")
                    sample_data = cursor.fetchall()
                    print("   Sample data:")
                    for row in sample_data:
                        print(f"     {row}")
        
        conn.close()
        print("\n" + "=" * 60)
        print("✅ Database viewing completed!")
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    view_database()
