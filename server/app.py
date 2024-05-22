#!/usr/bin/env python3

from flask_bcrypt import Bcrypt
from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, User, Cart, Item # import your models here!

app = Flask(__name__)
app.secret_key = "something"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

bcrypt = Bcrypt(app)

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.get('/')
def index():
    return "Hello world"

@app.post("/signup")
def signup():
    try:
        new_user = User(
            username=request.json.get('username'),
            email_address=request.json.get('email_address'),
            phone_number=request.json.get('phone_number'),
            age=request.json.get('age')
            )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()

        new_cart = Cart( cart_user_id=new_user.id )

        db.session.add(new_cart)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get("/check_session")
def check_session():
    user_id = session.get('user_id')
    if user_id:
        return User.query.filter(User.id == user_id).first().to_dict(), 200
    return {}, 401

@app.post("/login")
def login():
    user = User.query.filter(User.username == request.json['username']).first()
    if user == None:
        return {'error': 'username not found'}, 401
    elif bcrypt.check_password_hash(user._hashed_password, request.json['password']):
        session['user_id'] = user.id
        return user.to_dict(), 200
    return {'error': 'wrong password'}, 401

@app.delete("/logout")
def logout():
    if session.get('user_id') == None:
        return {}, 401
    session['user_id'] = None
    return {}, 204

@app.get("/user/cart")
def get_current_user_cart():
    if session.get('user_id') == None:
        return {},  401
    cart = Cart.query.where(Cart.cart_user_id == session['user_id']).first()
    if cart:
        return cart.to_dict()
    return {'error': "user doesn't have a cart"}, 404




@app.get("/users")
def get_users():
    return [user.to_dict() for user in User.query.all()], 200

@app.get('/users/<int:id>')
def get_public_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        return user.to_dict(), 200
    return {}, 404

@app.patch('/users/<int:id>')
def update_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        for key in request.json.keys():
            setattr(user,key,request.json[key])
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {}, 404

@app.delete('/users/<int:id>')
def delete_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/users')
def add_user():
    try:
        new_user = User(
            username=request.json.get('username'),
            email_address=request.json.get('email_address'),
            phone_number=request.json.get('phone_number'),
            age=request.json.get('age')
            )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.post('/carts')
def add_cart():
    try:
        new_cart = Cart( cart_user_id=request.json.get('cart_user_id') )
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get('/carts/<int:id>')
def get_cart(id):
    cart = Cart.query.where(Cart.id == id).first()
    if cart:
        return cart.to_dict(), 200
    return {}, 404

@app.patch('/carts/<int:id>')
def update_cart(id):
    try:
        cart = Cart.query.where(Cart.id == id).first()
        if cart:
            for key in request.json.keys():
                setattr(cart,key,request.json[key])
            db.session.add(cart)
            db.session.commit()
            return cart.to_dict()
        return {}, 404
    except Exception as e:
        return { 'error': str(e) }, 406

@app.delete('/carts/<int:id>')
def delete_cart(id):
    cart = Cart.query.where(Cart.id == id).first()
    if cart:
        db.session.delete(cart)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/items')
def add_item():
    try:
        new_item = Item( 
            name=request.json.get('name'),
            description=request.json.get('description'),
            item_user_id=request.json.get('item_user_id'),
            item_cart_id=request.json.get('item_cart_id')
            )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get("/items")
def get_items():
    return [item.to_dict() for item in Item.query.all()], 200

@app.get('/items/<int:id>')
def get_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        return item.to_dict(), 200
    return {}, 404

@app.patch('/items/<int:id>')
def update_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        for key in request.json.keys():
            setattr(item,key,request.json[key])
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {}, 404

@app.delete('/items/<int:id>')
def delete_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return {}, 204
    return {}, 404


if __name__ == '__main__':
    app.run(port=5555, debug=True)
