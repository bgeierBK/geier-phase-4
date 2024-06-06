#!/usr/bin/env python3

from flask import request, session, render_template

from config import app, bcrypt
from models import db, User, Cart, Item, Badge, UserBadge # import your models here!



@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


@app.post("/api/signup")
def signup():
    try:
        new_user = User(
            username=request.json.get('username'),
            email_address=request.json.get('email_address'),
            phone_number=request.json.get('phone_number'),
            age=request.json.get('age')
            )
        new_user.hashed_password = request.json['password']
        db.session.add(new_user)
        db.session.commit()

        new_cart = Cart( cart_user_id=new_user.id )

        db.session.add(new_cart)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get("/api/check_session")
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'user not found'}, 404
    return {}, 401

@app.post("/api/login")
def login():
    user = User.query.filter(User.username == request.json['username']).first()
    if user == None:
        return {'error': 'username not found'}, 401
    elif user.authenticate(request.json['password']):
        session['user_id'] = user.id
        return user.to_dict(), 200
    return {'error': 'wrong password'}, 401

@app.delete("/api/logout")
def logout():
    if session.get('user_id') == None:
        return {}, 401
    session['user_id'] = None
    return {}, 204

@app.get("/api/user/cart")
def get_current_user_cart():
    if session.get('user_id') == None:
        return {},  401
    cart = Cart.query.where(Cart.cart_user_id == session['user_id']).first()
    if cart:
        return cart.to_dict()
    return {'error': "user doesn't have a cart"}, 404




@app.get("/api/users")
def get_users():
    return [user.to_dict() for user in User.query.all()], 200

@app.get('/api/users/<int:id>')
def get_public_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        return user.to_dict(), 200
    return {}, 404

@app.patch('/api/users/<int:id>')
def update_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        for key in request.json.keys():
            setattr(user,key,request.json[key])
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {}, 404

@app.delete('/api/users/<int:id>')
def delete_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/api/users')
def add_user():
    try:
        new_user = User(
            username=request.json.get('username'),
            email_address=request.json.get('email_address'),
            phone_number=request.json.get('phone_number'),
            age=request.json.get('age')
            )
        new_user.hashed_password = request.json['password']
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.post('/api/carts')
def add_cart():
    try:
        new_cart = Cart( cart_user_id=request.json.get('cart_user_id') )
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get('/api/carts/<int:id>')
def get_cart(id):
    cart = Cart.query.where(Cart.id == id).first()
    if cart:
        return cart.to_dict(), 200
    return {}, 404

@app.patch('/api/carts/<int:id>')
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

@app.delete('/api/carts/<int:id>')
def delete_cart(id):
    cart = Cart.query.where(Cart.id == id).first()
    if cart:
        db.session.delete(cart)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/api/items')
def add_item():
    try:
        new_item = Item( 
            name=request.json.get('name'),
            description=request.json.get('description'),
            img_url=request.json.get('img_url'),
            price=request.json.get('price'),
            item_user_id=request.json.get('item_user_id'),
            item_cart_id=request.json.get('item_cart_id')
            )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get("/api/items")
def get_items():
    return [item.to_dict() for item in Item.query.all()], 200

@app.get('/api/items/<int:id>')
def get_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        return item.to_dict(), 200
    return {}, 404

@app.patch('/api/items/<int:id>')
def update_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        for key in request.json.keys():
            setattr(item,key,request.json[key])
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {}, 404

@app.delete('/api/items/<int:id>')
def delete_item(id):
    item = Item.query.where(Item.id == id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return {}, 204
    return {}, 404


@app.post('/api/badges')
def add_badge():
    try:
        new_badge = Badge( 
            name=request.json.get('name'),
            src=request.json.get('src')
            )
        db.session.add(new_badge)
        db.session.commit()
        return new_badge.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406

@app.get("/api/badges")
def get_badges():
    return [badge.to_dict() for badge in Badge.query.all()], 200

@app.get('/api/badges/<int:id>')
def get_badge(id):
    badge = Badge.query.where(Badge.id == id).first()
    if badge:
        return badge.to_dict(), 200
    return {}, 404

@app.patch('/api/badges/<int:id>')
def update_badge(id):
    badge = Badge.query.where(Badge.id == id).first()
    if badge:
        for key in request.json.keys():
            setattr(badge,key,request.json[key])
        db.session.add(badge)
        db.session.commit()
        return badge.to_dict()
    return {}, 404

@app.delete('/api/badges/<int:id>')
def delete_badge(id):
    badge = Badge.query.where(Badge.id == id).first()
    if badge:
        db.session.delete(badge)
        db.session.commit()
        return {}, 204
    return {}, 404


@app.get("/api/user-badge")
def get_user_badges():
    return [user_badge.to_dict() for user_badge in UserBadge.query.all()], 200

@app.get('/api/user-badge/<int:id>')
def get_user_badge(id):
    user_badge = UserBadge.query.where(UserBadge.id == id).first()
    if user_badge:
        return user_badge.to_dict(), 200
    return {}, 404

@app.patch('/api/user-badge/<int:id>')
def update_user_badge(id):
    user_badge = UserBadge.query.where(UserBadge.id == id).first()
    if user_badge:
        for key in request.json.keys():
            setattr(user_badge,key,request.json[key])
        db.session.add(user_badge)
        db.session.commit()
        return user_badge.to_dict()
    return {}, 404

@app.delete('/api/user-badge/<int:id>')
def delete_user_badge(id):
    user_badge = Badge.query.where(Badge.id == id).first()
    if user_badge:
        db.session.delete(user_badge)
        db.session.commit()
        return {}, 204
    return {}, 404



if __name__ == '__main__':
    app.run(port=5555, debug=True)
