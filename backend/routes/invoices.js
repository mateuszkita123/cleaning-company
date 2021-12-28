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
      if (req.xhr) {
        res.json(allInvoices);
      } else {
        res.render("invoices/index", { invoices: allInvoices, page: 'invoices' });
      }
    }
  });
});


//CREATE - add a new team to DB
router.post("/dodaj", function (req, res) {
  // get data from form and add to reports array
  const id = req.body.id;

  console.log("newInvoice: ", req.body);
  // Create a new team and save to DB
  // Invoice.create(newInvoice, function (err, newlyCreated) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     //redirect back to teams page
  //     res.redirect("/faktury");
  //   }
  // });
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
