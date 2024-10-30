## ⛓️ Authentication API ⛓️

This is a simple authentication REST API built using Node.js, Express, and MongoDB. It provides endpoints for user registration, login, logout, resetting password and protected routes that require authentication.

## Features

* MongoDB integration: Stores user information in a MongoDB database. <br>

* User registration: Allows users to create a new account by providing a username and password. <br>

* User login: Allows registered users to log in using their username and password. <br>

* User logout: Clear the refresh token cookie to log out a user. <br>

* Authentication: Uses JSON Web Tokens (JWT) to authenticate users and protect routes that require authentication. <br>

* Protected routes: Only a logged-in user can access this route. Here we use a middleware function to check if the user is logged in. <br>

* Password reset: It sends a password reset to the user. <br>



## To install all the dependencies, run the following command:

```
npm install
```

To start the server, run the following command:

```
npm run dev
```

## Author
This project was created by @ramlow07

