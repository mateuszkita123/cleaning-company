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
router.post("/dodaj", function (req, res) {
  const { invoice, user, team, address, area, unitPrice, description } = req.body;
  const newService = { invoice_id: invoice, user_id: user, teams_id: [team], service_address: address, service_area: area, service_unit_price: unitPrice, description: description, status: "CREATED" };

  Service.create(newService, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    }
  });
});

router.get("/edytuj/:id", function (req, res) {
  Service.find({ _id: req.params.id }).exec((err, allServices) => {
    if (err) {
      console.log(err);
    } else {
      console.log("allServices: ", allServices);

      // const allServicesData = allServices.map(team => ({ _id: team._id.toString(), name: team.name, employee_id: team.employee_id.map(employee => ({ _id: employee._id, firstName: employee.firstName, lastName: employee.lastName })) }));

      // console.log("allTeamsData: ", allTeamsData);

      res.json(allServices[0]);
    }
  })
});

// UPDATE - updates selected service
router.put("/edytuj/:id", function (req, res) {
  const newService = getTeamDataFromRequest(req);

  console.log("newService: ", newService);
  Team.findByIdAndUpdate(req.params.id, { $set: newService }, function (err, service) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  });
});

// TODO add middleware - handling user roles
router.delete("/", function (req, res) {
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
