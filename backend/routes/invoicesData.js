const express = require("express");

const router = express.Router();

const InvoicesData = require("../models/invoiceData");

//INDEX - show all invoices data
router.get("/", function (req, res) {
  InvoicesData.find({}, function (err, allInvoicesData) {
    if (err) {
      console.log(err);
    } else {
      res.json(allInvoicesData);
    }
  });
});

module.exports = router;
