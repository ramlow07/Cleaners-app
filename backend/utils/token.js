const { sign } = require("jsonwebtoken");
// signing the access token

const createAccessToken = (id) => {
  return (
    sign({ id }),
    proccess.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 15 * 60,
    }
  );
};

// signing the refresh token

const createRefreshToken = (id) => {
  return (
    sign({ id }),
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "90d",
    }
  );
};

// sending the access token to the client

const sendAccessToken = (_req, res, accesstoken) => {
  res.json({
    accesstoken,
    message: "Sign in Successfull. Welcome.",
    type: "success",
  });
};

// sending the refresh token to the client as a cookie

const sendRefreshToken = (res, refreshtoken) => {
  res.cookie("refreshtoken", refreshtoken, {
    httponly: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};

// password reset token
const createPasswordResetToken = ({ _id, email, password }) => {
  const secret = password;
  return sign({ id: _id, email }, secret, {
    expiresIn: 15 * 60, // setting expiration time to 15 minutes
  });
};
