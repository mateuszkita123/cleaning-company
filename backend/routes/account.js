const express = require("express");

const router = express.Router();

const User = require("../models/user");

//INDEX - show account data
router.get("/:id", function (req, res) {
  const accountId = req.params.id;
  User.find({ _id: accountId }, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
      } else {
        res.render("account", { account: account[0], page: 'account' });
      }
    }
  });
});

module.exports = router;
