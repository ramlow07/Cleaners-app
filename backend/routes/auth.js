var express = require("express");
var router = express.Router();
const cors = require("cors");

router.get("/", function (req, res) {
  res.send("Hello auth express!");
});

module.exports = router;

const userModel = require("../models/user.js");
const { hash, compare } = require("bcryptjs");
const User = require("../models/user.js");

router.post("/register", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(500).json({
        message:
          "User already exists. Try logging in or change your user to create a new one.",
        type: "warning",
      });
    }

    const passwordHash = await hash(password, 10);
    const newUser = new User({
      email: email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      message: "User created sucessfully. Try logging in",
      type: "success",
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error creating user! Try again.",
      error,
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

// Login request
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(500).json({
        message: "User doesn't exist!",
        type: "error",
      });

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      return res.status(500).json({
        message: "Password is incorrect!",
        type: "error",
      });

    const accessToken = createAccesToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshtoken = refreshToken;
    await user.save();

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

    if (!refreshtoken)
      return res.status(500).json({
        message: "No refresh token!",
        type: "error",
      });

    let id;
    try {
      id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
      return res.status(500).json({
        message: "invalid refresh token",
        type: "error",
      });
    }

    if (!id)
      return res.status(500).json({
        message: "Invalid refresh token",
        type: "error",
      });

    const user = await User.findById(id);

    if (!user)
      return res.status(500).json({
        message: "User doesn't exists!",
        type: "error",
      });

    if (user.refreshtoken !== refreshtoken)
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshtoken = refreshToken;

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

const { protected } = require("../utils/protected");

// protected route
router.get("/protected", protected, async (req, res) => {
  try {
    if (req.user)
      return res.json({
        message: "You're logged in!",
        type: success,
        user: req.user,
      });

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
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(500).json({
        messsage: "User doesn't exists",
        type: "error",
      });

    const token = createPasswordResetToken({ ...user, createdAt: Date.now() });

    const url = createPasswordResetUrl(user._id, token);

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

router.post("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res.status(500).json({
        message: "User doesn't exists",
        type: error,
      });
    const isValid = verify(token, user.password);
    if (!isValid)
      return res.status(500).json({
        message: "Invalid token.",
        type: error,
      });
    user.password = await hash(newPassword, 10);
    await user.save();

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
