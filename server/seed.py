#!/usr/bin/env python3

from app import app
from models import db, User, Item, Cart, Badge, UserBadge
from faker import Faker
from werkzeug.security import generate_password_hash

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")
        User.query.delete()
        Item.query.delete()
        Cart.query.delete()
        Badge.query.delete()
        UserBadge.query.delete()

        users = []
        items = []
        carts = []
        badges = []
        user_badge = []

        u = User(username="Stu Redman", age = 27, email_address="stu@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Fenriz", age = 45, email_address="fenriz@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Mother Abigail", age = 103, email_address="motherabigail@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Harold", age = 19, email_address="harold@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Nick Andros", age = 23, email_address="nick@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Tom Cullen", age =45, email_address="tom@gmail.com", phone_number= "5551234567")
        u.hashed_password="passwor`d"
        users.append(u)
        u = User(username="Larry Underwood", age =30, email_address="larry@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Glen Bateman", age =60, email_address="glen@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Randall Flagg", age =32, email_address="flagg@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Lloyd Henreid", age =27, email_address="lloyd@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Nadine Cross", age =22, email_address="nadine@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)
        u = User(username="Frances Goldsmith", age =19, email_address="frances@gmail.com", phone_number= "5551234567")
        u.hashed_password="password"
        users.append(u)


        db.session.add_all(users)
        db.session.commit()

        c= Cart(cart_user_id = 1)
        carts.append(c)
        c= Cart(cart_user_id = 2)
        carts.append(c)
        c= Cart(cart_user_id = 3)
        carts.append(c)
        c= Cart(cart_user_id = 4)
        carts.append(c)
        c= Cart(cart_user_id = 5)
        carts.append(c)
        c= Cart(cart_user_id = 6)
        carts.append(c)
        c= Cart(cart_user_id = 7)
        carts.append(c)
        c= Cart(cart_user_id = 8)
        carts.append(c)
        c= Cart(cart_user_id = 9)
        carts.append(c)
        c= Cart(cart_user_id = 10)
        carts.append(c)
        c= Cart(cart_user_id = 11)
        carts.append(c)
        c= Cart(cart_user_id = 12)
        carts.append(c)

        db.session.add_all(carts)
        db.session.commit()

        i = Item(name="Han Solo action figure", description="Mint in box!", price= 100, img_url="https://www.trgtoys.com/cdn/shop/products/HanSoloRetro.jpg?v=1584661902", item_user_id=1)
        items.append(i)
        i = Item(name="Yoda action figure", description="Near-mint condition", price= 75, img_url="https://www.dotcomcomics.com/images/Star-Wars-action-figures-Yoda-Council-Chair.png", item_user_id=1)
        items.append(i)
        i = Item(name="Sarumon Statue", description="Some slight damage", price= 50, img_url="https://images.fun.com/products/72113/1-2/lord-of-the-rings-saruman-the-white-miniature-statue.jpg", item_user_id=2, item_cart_id=3)
        items.append(i)
        i = Item(name="Lord of the Rings goblet", description="Never used", price= 150, img_url="https://www.differentworlds.co.uk/upload/mt/diff388/products/th_null-lord-of-the-rings-aragorn-goblet-19.5cm.jpg", item_user_id=2)
        items.append(i)
        i = Item(name="Captain America statue", description="Like new", price= 75, img_url="https://cdn.marvel.com/content/1x/pcs-captain-america-2.jpg", item_user_id=3, item_cart_id=1)
        items.append(i)
        i = Item(name="Signed Infinity Gauntlet", description="Comes with display case", price= 1000, img_url="https://i.pinimg.com/474x/ae/5f/40/ae5f40f02b39a565059404fd17da6cdc.jpg", item_user_id=5)
        items.append(i)
        i = Item(name="X-Men Issue 1", description="Good quality", price= 5000, img_url="https://mem-expert.s3.us-west-2.amazonaws.com/wp-content/uploads/2017/08/07161831/99800-dis_01.jpg", item_user_id=5)
        items.append(i)
        i = Item(name="Hogwarts Watch", description="Lightly used", price= 475, img_url="https://www.rollingstone.com/wp-content/uploads/2022/10/FSL4929862_HOL22_AD_25.jpeg?w=1581&h=1054&crop=1", item_user_id=6, item_cart_id=1)
        items.append(i)
        i = Item(name="Hogwarts Lego set", description="Opened, but never constructed", price= 400, img_url="https://www.lego.com/cdn/cs/set/assets/blt08668e770aaef16e/71043_alt1.jpg", item_user_id=6)
        items.append(i)
        i = Item(name="Batman action figure", description="Previously kept in display case (not included)", price= 100, img_url="https://i5.walmartimages.com/seo/DC-Comics-12-inch-Batman-Action-Figure-Kids-Toys-for-Boys-and-Girls-Ages-3-and-Up_94309d0e-c586-41b0-8e1d-937e63b73316.c829a72fc32d75395f033dbcadaa492a.jpeg", item_user_id=7)
        items.append(i)
        i = Item(name="Aquaman action figure", description="Some previous use", price= 35, img_url="https://media.gamestop.com/i/gamestop/20005276?$pdp$", item_user_id=8)
        items.append(i)
        i = Item(name="Endgame signed poster", description="Comes with verification", price= 600, img_url="https://i.pinimg.com/736x/87/46/e9/8746e98a61508acc19f8262c13d620f9.jpg", item_user_id=8)
        items.append(i)
        i = Item(name="Darth Vader statue", description="Near-mint", price= 150, img_url="https://m.media-amazon.com/images/I/21DFM86CYPL._AC_UF894,1000_QL80_.jpg", item_user_id=1, item_cart_id=7)
        items.append(i)

        db.session.add_all(items)
        db.session.commit()
     
        b = Badge(name="Buying Items", src="./images/badge1.png")
        badges.append(b)
        b = Badge(name="Selling Items", src="./images/badge2.png")
        badges.append(b)

        db.session.add_all(badges)
        db.session.commit()

        ub = UserBadge(user_id='1', badge_id = '1')
        user_badge.append(ub)
        ub = UserBadge(user_id='3', badge_id = '1')
        user_badge.append(ub)
        ub = UserBadge(user_id='7', badge_id = '1')
        user_badge.append(ub)

        ub = UserBadge(user_id='1', badge_id = '2')
        user_badge.append(ub)
        ub = UserBadge(user_id='2', badge_id = '2')
        user_badge.append(ub)
        ub = UserBadge(user_id='5', badge_id = '2')
        user_badge.append(ub)
        ub = UserBadge(user_id='6', badge_id = '2')
        user_badge.append(ub)
        ub = UserBadge(user_id='8', badge_id = '2')
        user_badge.append(ub)

        db.session.add_all(user_badge)
        db.session.commit()



   
    #name = db.Column(db.String)
    #description = db.Column(db.String)
    # price = db.Column(db.Integer)
    #img_url = db.Column(db.String)
    #item_user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))

        




       



    



        print("Seeding complete!")
