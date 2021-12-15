const express = require("express");

const router = express.Router();

//INDEX - show all invoices
router.get("/", function (req, res) {
  res.render("invoices/index", { page: 'invoices' });
});

module.exports = router;
