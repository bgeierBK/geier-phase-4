from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.model, SerializerMixin):
    __tablename__ = 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email_address = db.Column(db.String)
    password= db.Column(db.String)
    phone_number = db.Column(db.String)

class Cart(db.model, SerializerMixin):
    __tablename__ = 'carts_table'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))

class Item(db.Model):
    __tablename__ = 'items_table'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    cart_id = db.Column(db.Integer, db.ForeignKey('carts_table.id'))