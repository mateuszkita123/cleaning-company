const express = require("express");

const router = express.Router();

const Invoice = require("../models/invoice");
const InvoicesData = require("../models/invoiceData");
const Team = require("../models/team");

//INDEX - show all invoices
router.get("/", function (req, res) {
  Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      res.json(allInvoices);
    }
  });
});

//CREATE - add a new team to DB
router.post("/dodaj", function (req, res) {
  // get data from form and add to reports array
  const is_b2b = req.body.is_b2b;
  const invoice_data_id = req.body.invoice_data_id;
  const newInvoice = {
    is_b2b: is_b2b,
    invoice_data_id: invoice_data_id
  }

  // Create a new team and save to DB
  if (is_b2b !== undefined && invoice_data_id !== undefined) {
    Invoice.create(newInvoice, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        console.log("newlyCreated: ", newlyCreated);
      }
    });
  } else {
    const response = { status: "ERROR" };
    res.json(response);
  }
});

//NEW - show form to create new report
router.get("/dodaj", function (req, res) {
  Team.find({}, function (err, allTeams) {
    if (err) {
      console.log(err);
    } else {
      const teams = allTeams.map(elem => elem._id.toString());
      res.json(teams);
    }
  });
});

module.exports = router;
