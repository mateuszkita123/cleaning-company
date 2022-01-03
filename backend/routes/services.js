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
      response.teams.push(allTeams);
    }
  }).clone().catch(function (err) { console.log(err) });

  await User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      response.users.push(allUsers);
    }
  }).clone().catch(function (err) { console.log(err) });

  await Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      response.invoices.push(allInvoices);
    }
  }).clone().catch(function (err) { console.log(err) });

  res.json(response);
});

module.exports = router;
