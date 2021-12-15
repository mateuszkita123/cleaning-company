const express = require("express");

const router = express.Router();

const User = require("../models/user");

//INDEX - show all clients
router.get("/", function (req, res) {
  User.find({ role_id: "Klient" }, function (err, allClients) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allClients);
      } else {
        res.render("clients/index", { clients: allClients, page: 'clients' });
      }
    }
  });
});

module.exports = router;
