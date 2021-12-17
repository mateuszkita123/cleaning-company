const express = require("express");

const router = express.Router();

const Team = require("../models/team");
const User = require("../models/user");

//INDEX - show all teams
router.get("/", function (req, res) {
  Team.find({}, function (err, allTeams) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allTeams);
      } else {
        res.render("teams/index", { teams: allTeams, page: 'teams' });
      }
    }
  });
});

//CREATE - add a new team to DB
router.post("/dodaj", function (req, res) {
  // get data from form and add to reports array
  const id = req.body.id;
  const name = req.body.teamName;
  const newTeam = { name: name, employee_id: [id] };

  // Create a new team and save to DB
  Team.create(newTeam, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to teams page
      res.redirect("/zespoly");
    }
  });
});

//NEW - show form to create new report
router.get("/dodaj", function (req, res) {
  User.find({ role_id: "Pracownik" }, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allUsers);
      } else {
        res.render("teams/new", { users: allUsers.map(elem => elem._id.toString()) });
      }
    }
  });
});

module.exports = router;
