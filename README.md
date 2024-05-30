

![alt text](client/images/action-figure.png)![alt text](client/images/logo.png)

## Table of Contents <a name="table-of-contents"></a>

- [Project Description](#project-description)
- [Features](#features)
- [Tech StacK](#tech_stack)
- [Installation](#installation)
- [Contact](#contact)



## Project Description <a name="project-description"></a>

Collectible Corner is an e-commerce platform where users can buy and sell their own collectibles and memorabilia. This project was built using SQLFlask for the backend and React for the frontend 

## Features <a name="features"></a>

- User authentication and authorization
- The ability to sign-up with your own user name and password
- Login with said username and password 
- User has its own profile where they can see their collectibles as well as have badges that identify if they are seller  or buyer
- User can Add or Delete listing in profile
- A Marketplace where Users and their for sale items are listed
- User has ability to add/delete items from marketplace to cart
- User can fill out payment info once they are ready to checkout

## Tech Stack <a name="tech_stack"></a>

- Backend: Flask, SQLAlchemy, RESTful APIs
- Frontend: React

## Installation <a name="installation"></a>
## Prerequisites

- vite 5.2.0+
- python 3.7+
- React Router Dom

## General Setup

Fork and Clone via git hub

run in console
- git clone https://github.com/yourusername/phase4-project.git

- cd phase4-project
- code .

## Frontend Setup

to install vite
- npm install --prefix client

to run the frontend 
- npm run dev --prefix client

## Backend Setup

to install dependencies 

- pipenv install 
- pipenv shell 

move to server
- cd server

to run the server 

-python app.py

## Setup Database & Seed
** please be aware you need to be in server so do not forget

- flask db init
- flask db migrate -m "Initial migration."
- flask db upgrade

to seed the database 
- python seed.py

## Contact The Devs <a name="contact"></a>


- Annania Plossl [GitHub](https://github.com/PenguinPerson1)
- Ben Geier  [GitHub](https://github.com/bgeierBK)
- Ahmed Basamad [GitHub](https://github.com/Truthseeker01)
- Victor Cardenas [GitHub](https://github.com/VC2324)




