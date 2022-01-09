const express = require("express");

const router = express.Router();

const Team = require("../models/team");
const User = require("../models/user");
const { UserRoles } = require("../constans");

//INDEX - show all teams
router.get("/", function (req, res) {
  Team.find({}, function (err, allTeams) {
    if (err) {
      console.log(err);
    } else {
      res.json(allTeams);
    }
  });
});

//NEW - show form to create new report
router.get("/dodaj", function (req, res) {
  User.find({ role_id: UserRoles.USER }, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      const users = allUsers.map(elem => elem._id.toString());
      res.json(users);
    }
  });
});

//CREATE - add a new team to DB
router.post("/dodaj", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const employee_ids = id ? [id] : [];
  const newTeam = { name: name, employee_id: employee_ids };

  console.log("newTeam: ", newTeam);
  // Create a new team and save to DB
  Team.create(newTeam, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  });
});

module.exports = router;
