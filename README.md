# Review System
A Simple Review System For A Organization
## Home Page

<img src="https://github.com/richardiyama/ReviewSystem/blob/master/frontend/reviewsystem/public/home.JPG" height="400" />


## Sign In Page

<img src="https://github.com/richardiyama/ReviewSystem/blob/master/frontend/reviewsystem/public/login.JPG" height="400" />

## Register Page

<img src="https://github.com/richardiyama/ReviewSystem/blob/master/frontend/reviewsystem/public/Register.JPG" height="400" />

## Approve Page

<img src="https://github.com/richardiyama/ReviewSystem/blob/master/frontend/reviewsystem/public/approve.JPG" height="400" />

# Install Packages
Run: npm install or yarn install or yarn add
cd to Backend Folder
Run: node server.js to start the server.
cd to Frontend Folder
Run: npm start to start React app
# Database used
Mysql(PhpMyadmin)

# ORM used
Sequelize

#Testing with Mocha and Chai
cd to Backend Folder
Run: npm test

# Api End points

# Register new User
Post: localhost:3000/api/v1/users/create

# Signin User
Post: localhost:3000/api/v1/users/signin

# Get all Users
Get: localhost:3000/api/v1/users/index

# Create Reviews
Post: localhost:3000/api/v1/reviews/create

# Get All Reviews
Get: localhost:3000/api/v1/reviews/getAllReview

# Approve Reviews
Put: localhost:3000/api/v1/reviews/approve

# Notes
Create two roles each for "admin" and "user"
on Phpmyadmin and also set a registered User manually to admin by 
changing the "roleId" on user-roles" to 2.
Thanks...
