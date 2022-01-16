const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};

exports.getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  })
}

exports.getRefreshToken = user => {
  console.warn("process.env.REFRESH_TOKEN_SECRET: ", process.env.REFRESH_TOKEN_SECRET);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  })
  return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })

exports.isClient = function (req, res, next) {
  console.log("isClient req.user ROLE: ", req.user.role_id);
  if (req.user.role_id === "Klient") {
    next();
  } else {
    res.status(401);
    res.send({ status: "Permission error" });
  }
}

exports.isEmployee = function (req, res, next) {
  console.log("isClient req.user ROLE: ", req.user.role_id);
  if (req.user.role_id === "Pracownik") {
    next();
  } else {
    res.status(401);
    res.send({ status: "Permission error" });
  }
}

exports.isAdmin = function (req, res, next) {
  console.log("isClient req.user ROLE: ", req.user.role_id);
  if (req.user.role_id === "Administrator") {
    next();
  } else {
    res.status(401);
    res.send({ status: "Permission error" });
  }
}