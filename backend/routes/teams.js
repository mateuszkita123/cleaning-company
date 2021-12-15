const express = require("express");

const router = express.Router();

//INDEX - show all teams
router.get("/", function (req, res) {
  res.render("teams/index", { page: 'teams' });
});

module.exports = router;
