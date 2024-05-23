#!/usr/bin/env python3

from app import app
from models import db, User, Item, Cart
from faker import Faker
from werkzeug.security import generate_password_hash

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")
        User.query.delete()

        users = [
        {"username": "john_doe", "age": "30", "email_address": "john@example.com", "password": "password123", "phone_number": "123-456-7890"},
        {"username": "jane_smith", "age": "25", "email_address": "jane@example.com", "password": "password123", "phone_number": "123-456-7891"},
        {"username": "alice_jones", "age": "28", "email_address": "alice@example.com", "password": "password123", "phone_number": "123-456-7892"},
        {"username": "bob_brown", "age": "35", "email_address": "bob@example.com", "password": "password123", "phone_number": "123-456-7893"},
        {"username": "charlie_davis", "age": "22", "email_address": "charlie@example.com", "password": "password123", "phone_number": "123-456-7894"},
        {"username": "diana_clark", "age": "29", "email_address": "diana@example.com", "password": "password123", "phone_number": "123-456-7895"},
        {"username": "edward_lee", "age": "33", "email_address": "edward@example.com", "password": "password123", "phone_number": "123-456-7896"},
        {"username": "frank_harris", "age": "31", "email_address": "frank@example.com", "password": "password123", "phone_number": "123-456-7897"},
        {"username": "george_white", "age": "27", "email_address": "george@example.com", "password": "password123", "phone_number": "123-456-7898"},
        {"username": "hannah_green", "age": "26", "email_address": "hannah@example.com", "password": "password123", "phone_number": "123-456-7899"},
    ]
        for user_data in users:
            hashed_password = generate_password_hash(user_data["password"])
            user = User(
                username=user_data["username"],
            age=user_data["age"],
            email_address=user_data["email_address"],
            _hashed_password=hashed_password,
            phone_number=user_data["phone_number"]
        )
        db.session.add(user)

        db.session.commit()


        print("Seeding complete!")
