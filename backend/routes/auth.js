var express = require("express"); 

var router = express.Router();

router.get("/", function (req, res) {
    // console.log("request", req)
    // console.log ("reponse", res)
    // sending the response

    res.send("Hello auth express!")
});

module.exports = router;



const userModel = require ('../models/user.js');
const { hash, compare } = require("bcryptjs");


// importing the user model
const User = require ("../models/user.js");

// Sign Up request
router.post("/signup", async (req, res) => {
    try {
        const {email, password} = req.body;
        // check if the user already exists
        const user = await User.findOne({ email: email});

        // if user already exists, return error

        if (user)
        return res.status(500).json({
            message: "User already exists. Try logging in or change your user to create a new one.",
            type: "warning",

        });

        // 2. if user does not exist, create a new one
        // hashing the password

        const passwordHash =  await hash(password, 10);
        const newUser = new User({
            email: email,
            password: passwordHash,
        });

        // 3. saving the user to the database
        await newUser.save();

        // 4. send the response 
        res.status(200).json({
            message: "User created sucessfully. Try logging in",
            type: "success",
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Error creating user! Try again.",
            error
        });
    }
});

module.exports = router;

// importing the helper functions
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,

} = require("../utils/token.js");

// Sign in request
router.post("../signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user already exists

    const user = await User.findOne ({ email: email});

    // if user does not exist, return error

    if (!user)
    return res.status(500).json ({
        message: "User doesn't exist!",
        type: "error",
    });

    // 2. if user exists, check if the password is correct
    const isMatch = await compare(password, user.password);

    // if password is incorrect, return error

    if (!isMatch) 
    return res.status(500).json({
        message: "Password is incorrect!",
        type: "error",
    });

    // 3. if the password is correct, create the tokens
    const accessToken = createAccesToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // 4. put refresh token in database
    user.refreshtoken = refreshToken;
    await user.save();

    // 5. send the response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "An error occurred while signing in.",
            error,
        });
    }
});

// Sign out request
router.post("/logout", (_req, res) => {
    // clear cookies
    res.clearCookie("refreshtoken");
    return res.json({
        message: "Logged out successfully.",
        type: "success",
    });
});

// endpoint for getting a new access token using a refresh token

const { verify } = require("jsonwebtoken");

// Refresh token request

router.post("/refresh_token", async (req, res) => {
    try {
        const { refreshtoken } = req.cookies;
        // if we don't have a refresh token, return error

        if(!refreshtoken)
        return res.status(500).json({
            message: "No refresh token!",
            type: "error",
        });

        // if we have a refresh token, we have to verify it

        let id;
        try {
            id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
        } catch (error) {
            return res.status(500).json({
                message: "invalid refresh token",
                type: "error",
            });
        }

        // if the refresh token is invalid, return error

        if(!id)
        return res.status(500).json({
            message: "Invalid refresh token",
            type: "error",
        });

        // if the refresh token is valid, check if the user exists
        const user = await User.findById(id);

        // if the user doesn't exists, return error
        if (!user)
        return res.status(500).json({
            message: "User doesn't exists!",
            type: "error",
        });

        // if the user exists, check if the refresh token is correct. return error if it is incorrect.
        if (user.refreshtoken !== refreshtoken)
        return res.status(500).json({
            message: "Invalid refresh token!",
            type: "error",
        });

        // if the refresh token is correct, create new tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        
        // update the refresh token in the database
        user.refreshtoken = refreshToken;

        // send the new tokens as a reponse
        sendRefreshToken(res, refreshToken);
        return res.json({
            message: "Refreshed successfully",
            type: "success",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Error refreshing token!",
            error,
        });
    }
});

const { protected } = require ("../utils/protected");

// protected route
router.get("/protected", protected, async (req, res) => {
    try {
        // if the user exists in the request, send the data
        if (req.user)
        return res.json({
            message: "You're logged in!",
            type: success,
            user: req.user,
        })
        // if the user doesn't exist, return error
        return res.status(500).json({
            message: "You're not logged in.",
            type: error,
        });
    } catch (error) {
        res.status(500).json({
            type: error,
            message: "error getting protected route!",
            error,
        });
    }
});

const { createPasswordResetToken } = require("../utils/token.js");
const { 
    transporter,
    createPasswordResetUrl,
    passwordResetTemplate,
    passwordResetConfirmationTemplate,
} = require("../utils/email");

// send the password reset email

router.post("/send-password-reset-email", async (req, res) => {
    try {
        // get the user from request body
        const { email } = req.body;
        // find the user by email
        const user = await User.findOne ({ email });
        // if the user doesn't exists, return error
        if (!user)
        return res.status(500).json({
            messsage: "User doesn't exists",
            type: "error",
        });
        // create a password reset token
        const token = createPasswordResetToken ({ ...user, createdAt: Date.now() });
        // create the password reset url
        const url = createPasswordResetUrl(user._id, token);
        // send the email
        const mailOptions = passwordResetTemplate(user, url);
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
            return res.status(500).json({
                message: "Error sending e-mail.",
                type: "error",
            });
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Error sending e-mail.",
            error,
        });
    }
});

// reset password

router.post("/reset-password/:id/:token", async (req, res) => {
    try {
        // get the user details from the url 
        const {id, token } = req.params;
        // get the new password to the request body
        const { newPassword } = req.body;
        // find the user by id
        const user = await User.findById(id);
        // if the user doesn't exists, return error
        if (!user)
        return res.status(500).json({
            message: "User doesn't exists",
            type: error,
        });
        // verify if the token is valid
        const isValid = verify(token, user.password);
        // if the reset password token is invalid, return error
        if (!isValid)
        return res.status(500).json({
            message: "Invalid token.",
            type: error,
        });
        // set the user's password to the new password
        user.password = await hash(newPassword, 10);
        // save the user
        await user.save();
        // send the email
        const mailOptions = passwordResetConfirmationTemplate(user);
        transporter.sendEmail(mailOptions, (err, info) => {
            if (err)
            return res.status(500).json({
                message: "Error sending email!",
                type: error,
            });
            return res.json({
                message: "Email sent successfully",
                type: success,
            });
        });
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Error sending email.",
        });
    }
});