from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.String)
    email_address = db.Column(db.String)
    _hashed_password= db.Column(db.String)
    phone_number = db.Column(db.String)

    cart = db.relationship('Cart', back_populates="user")
    items = db.relationship('Item', back_populates="user")

    serialize_rules=['-cart.user', '-items.user','-_hashed_password']

    @validates('username')
    def validate_username(self, key, value):
        if len(value.strip().replace(' ', '_')) >= 5:
            return value.strip().replace(' ', '_')
        else:
            raise ValueError('Username must be at least five characters')
    
    @validates('age')
    def validate_age(self, key, value):
        if value == None or value >=13:
            return value
        else:
            raise ValueError("Must be at least 13 years old")
    
    @validates('email_address')
    def validate_email(self, key, value):
        if '@' in value:
            return value
        else:
            return ValueError('Not a valid email address')
    
    

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts_table'

    id = db.Column(db.Integer, primary_key=True)
    cart_user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    
    items = db.relationship('Item', back_populates = 'cart')
    user = db.relationship('User', back_populates = 'cart')

    serialize_rules=['-items.cart', '-user.cart']


class Item(db.Model, SerializerMixin):
    __tablename__ = 'items_table'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    item_user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    item_cart_id = db.Column(db.Integer, db.ForeignKey('carts_table.id'))

    cart = db.relationship('Cart', back_populates='items')
    user = db.relationship('User', back_populates='items')

    serialize_rules=['-cart.items', '-user.items']