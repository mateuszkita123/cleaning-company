const express = require("express");

const router = express.Router();

//INDEX - show all reserved services
router.get("/", function (req, res) {
  res.render("services/index", { page: 'services' });
});

module.exports = router;
