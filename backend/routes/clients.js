const express = require("express");

const router = express.Router();

const User = require("../models/user");

//INDEX - show all clients
router.get("/", function (req, res) {
  User.find({ role_id: "Klient" }, function (err, allClients) {
    if (err) {
      console.log(err);
    } else {
      res.json(allClients);
    }
  });
});

module.exports = router;
