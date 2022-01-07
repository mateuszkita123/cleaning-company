const express = require("express");

const router = express.Router();

const Service = require("../models/service");
const Team = require("../models/team");
const User = require("../models/user");
const Invoice = require("../models/invoice");

//INDEX - show all reserved services
router.get("/", function (req, res) {
  Service.find({}, function (err, allServices) {
    if (err) {
      console.log(err);
    } else {
      res.json(allServices);
    }
  });
});

//NEW - show form to create new report
router.get("/dodaj", async function (req, res) {
  const response = { teams: [], users: [], invoices: [] };

  await Team.find({}, function (err, allTeams) {
    if (err) {
      console.log(err);
    } else {
      response.teams = [...allTeams];
    }
  })
  // .clone().catch(function (err) { console.log(err) });

  await User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      response.users = [...allUsers];
    }
  })
  // .clone().catch(function (err) { console.log(err) });

  await Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      response.invoices = [...allInvoices];
      res.json(response);
    }
  })
  // .clone().catch(function (err) { console.log(err) });
});

//CREATE - add a new service to DB
router.post("/dodaj", function (req, res) {
  // get data from form and add to reports array
  const { invoice, user, team, address, area, unitPrice, description } = req.body;
  const newService = { invoice_id: invoice, user_id: user, teams_id: [team], service_address: address, service_area: area, service_unit_price: unitPrice, description: description, status: "CREATED" };

  // Create a new team and save to DB
  Service.create(newService, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to services page
      res.redirect("/uslugi");
    }
  });
});

module.exports = router;
