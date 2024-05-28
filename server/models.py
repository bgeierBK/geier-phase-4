from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

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

    @hybrid_property
    def hashed_password(self):
        raise AttributeError('Password hashes may not be viewed.')

    @hashed_password.setter
    def hashed_password(self, password):
        hashed_password = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._hashed_password = hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._hashed_password, password.encode('utf-8'))

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
        if value == None or '@' in value:
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
    price = db.Column(db.Integer)
    img_url = db.Column(db.String)
    item_user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    item_cart_id = db.Column(db.Integer, db.ForeignKey('carts_table.id'))

    cart = db.relationship('Cart', back_populates='items')
    user = db.relationship('User', back_populates='items')

    serialize_rules=['-cart.items', '-user.items']