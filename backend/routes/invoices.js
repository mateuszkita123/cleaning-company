const express = require("express");

const router = express.Router();

const Invoice = require("../models/invoice");
const Team = require("../models/team");

const { verifyUser, hasClientPermissions } = require("../authenticate")

//INDEX - show all invoices
router.get("/", verifyUser, hasClientPermissions, function (req, res) {
  // TODO different actions for different roles
  Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      res.json(allInvoices);
    }
  });
});

//CREATE - add a new invoice to DB
router.post("/dodaj", verifyUser, hasClientPermissions, function (req, res) {
  // get data from form and add to reports array
  const is_b2b = req.body.is_b2b;
  const invoice_data_id = req.body.invoice_data_id;
  const newInvoice = {
    is_b2b: is_b2b,
    invoice_data_id: invoice_data_id
  }

  // Create a new invoice and save to DB
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

//NEW - show form to create new invoice
router.get("/dodaj", verifyUser, hasClientPermissions, function (req, res) {
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
