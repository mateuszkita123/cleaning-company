const express = require("express");

const router = express.Router();

const User = require("../models/user");

//INDEX - show all users
router.get("/", function (req, res) {
  User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      res.json(allUsers);
    }
  });
});

module.exports = router;
