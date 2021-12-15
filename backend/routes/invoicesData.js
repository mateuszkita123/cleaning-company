const express = require("express");

const router = express.Router();

const InvoicesData = require("../models/invoiceData");

//INDEX - show all invoices data
router.get("/", function (req, res) {
  InvoicesData.find({}, function (err, allInvoicesData) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allInvoicesData);
      } else {
        res.render("invoicesData/index", { invoicesData: allInvoicesData, page: 'invoicesData' });
      }
    }
  });
});

module.exports = router;
