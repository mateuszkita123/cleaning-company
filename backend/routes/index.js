const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//root route
router.get("/", function (req, res) {
  res.render("home");
});

//root route
router.get("/kontakt", function (req, res) {
  res.render("contact", { page: 'contact' });
});

// show register form
router.get("/register", function (req, res) {
  res.render("register", { page: 'register' });
});

//handle sign up logic
router.post("/register", function (req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register", { error: err.message });
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Rejestracja przebiegła pomyślnie! Witaj " + req.body.username);
      res.redirect("/reports");
    });
  });
});

//show login form
router.get("/login", function (req, res) {
  res.render("login", { page: 'login' });
});

//handling login logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/reports",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Pomyślnie zalogowano do systemu!'
  }), function (req, res) {
  });

// logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Do zobaczenia!");
  res.redirect("/");
});

module.exports = router;
