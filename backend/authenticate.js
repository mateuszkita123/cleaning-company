const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: process.env.REFRESH_TOKEN_EXPIRY * 1000,
  sameSite: "none",
}

exports.getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXPIRY,
  })
}

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  })
  return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })

exports.customVerifyUser = (req, res, next) => {
  const token = req.get("Authorization");

  console.log("token: ", token);

  User.findAll({}, function (err, allUsers) {
    if (err) {
      console.log("err: ", err);
      // return done(err, false)
    }
    if (allUsers) {
      // console.log("user: ", user);
      res.status(200).send('Success!');
      // res.send(user);
      // return (user);
      // return done(null, user)
    } else {
      console.log("null, false");
      // return done(null, false)
      // or you could create a new account
    }
  })
}
