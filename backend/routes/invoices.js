const express = require("express");

const router = express.Router();

const Invoice = require("../models/invoice");

//INDEX - show all invoices
router.get("/", function (req, res) {
  Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allInvoices);
      } else {
        res.render("invoices/index", { invoices: allInvoices, page: 'invoices' });
      }
    }
  });
});

module.exports = router;
