const express = require("express");

const router = express.Router();

const Service = require("../models/service");
const Team = require("../models/team");
const User = require("../models/user");
const Invoice = require("../models/invoice");

const { verifyUser, hasClientPermissions, hasAdminPermissions } = require("../authenticate")

const getServiceDataFromRequest = (req) => {

  const { invoice_id,
    user_id,
    teams_id,
    service_address,
    service_area,
    service_unit_price,
    description,
    status } = req.body;

  console.log("req.body: ", req.body);

  return ({ invoice_id, user_id, teams_id: [teams_id], service_address, service_area, service_unit_price, description, status });
}

//INDEX - show all reserved services
router.get("/", verifyUser, hasClientPermissions, function (req, res) {
  Service.find({}, function (err, allServices) {
    if (err) {
      console.log(err);
    } else {
      res.json(allServices);
    }
  });
});

//NEW - show form to create new report
router.get("/dodaj", verifyUser, hasClientPermissions, async function (req, res) {
  const response = { teams: [], users: [], invoices: [] };

  await Team.find({}, function (err, allTeams) {
    if (err) {
      console.log(err);
    } else {
      response.teams = [...allTeams];
    }
  })

  await User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      response.users = [...allUsers];
    }
  })

  await Invoice.find({}, function (err, allInvoices) {
    if (err) {
      console.log(err);
    } else {
      response.invoices = [...allInvoices];
      res.json(response);
    }
  })
});

//CREATE - add a new service to DB
router.post("/dodaj", verifyUser, hasClientPermissions, function (req, res) {
  const { invoice, user, team, address, area, unitPrice, description } = req.body;
  const newService = { invoice_id: invoice, user_id: user, teams_id: [team], service_address: address, service_area: area, service_unit_price: unitPrice, description: description, status: "CREATED" };

  Service.create(newService, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  });
});

router.get("/edytuj/:id", verifyUser, hasClientPermissions, function (req, res) {
  Service.find({ _id: req.params.id }).exec((err, allServices) => {
    if (err) {
      console.log(err);
    } else {
      res.json(allServices[0]);
    }
  })
});

// UPDATE - updates selected service
// TODO add middleware to check is service belongs to user
router.put("/edytuj/:id", verifyUser, hasClientPermissions, function (req, res) {
  const newService = getServiceDataFromRequest(req);

  Service.updateOne({ _id: req.params.id }, { $set: newService }, function (err, service) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  });
});

// DELETE - deletes selected service
router.delete("/", verifyUser, hasAdminPermissions, function (req, res) {
  const id = req.body.id;

  Service.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      res.send({ status: err });
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  })
});

module.exports = router;
