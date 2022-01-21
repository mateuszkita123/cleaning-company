const express = require("express");

const router = express.Router();

const InvoicesData = require("../models/invoiceData");

const { verifyUser, hasClientPermissions } = require("../authenticate")

//INDEX - show all invoices data
router.get("/", verifyUser, hasClientPermissions, function (req, res) {
  // TODO different actions on different roles
  InvoicesData.find({}, function (err, allInvoicesData) {
    if (err) {
      console.log(err);
    } else {
      res.json(allInvoicesData);
    }
  });
});

module.exports = router;
