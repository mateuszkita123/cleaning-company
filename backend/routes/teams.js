const express = require("express");

const router = express.Router();

const Team = require("../models/team");
const User = require("../models/user");
const { UserRoles } = require("../constans");

//INDEX - show all teams
router.get("/", function (req, res) {
  Team.find({}).populate({
    path: "employee_id"
  }).exec((err, allTeams) => {
    if (err) {
      console.log(err);
    } else {
      console.log("allTeams: ", allTeams);

      const allTeamsData = allTeams.map(team => ({ _id: team._id.toString(), name: team.name, employee_id: team.employee_id.map(employee => ({ _id: employee._id, firstName: employee.firstName, lastName: employee.lastName })) }));

      console.log("allTeamsData: ", allTeamsData);

      res.json(allTeamsData);
    }
  })
});

//NEW - show form to create new report
router.get("/dodaj", function (req, res) {
  User.find({ role_id: UserRoles.USER }, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      const users = allUsers.map(elem => ({ _id: elem._id.toString(), firstName: elem.firstName, lastName: elem.lastName }));
      res.json(users);
    }
  });
});

router.get("/edytuj/:id", function (req, res) {

  Team.find({ _id: req.params.id }).populate({
    path: "employee_id"
  }).exec((err, allTeams) => {
    if (err) {
      console.log(err);
    } else {
      console.log("allTeams: ", allTeams);

      const allTeamsData = allTeams.map(team => ({ _id: team._id.toString(), name: team.name, employee_id: team.employee_id.map(employee => ({ _id: employee._id, firstName: employee.firstName, lastName: employee.lastName })) }));

      console.log("allTeamsData: ", allTeamsData);

      res.json(allTeamsData[0]);
    }
  })


  // Team.find({ _id: req.params.id }, function (err, allTeams) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("allTeams: ", allTeams);
  //     const teams = allTeams.map(elem => ({ _id: elem._id.toString(), name: elem.name, employee_ids: elem.employee_id }));
  //     console.log("teams: ", teams);
  //     // res.status(200);
  //     res.json(teams[0]);
  //   }
  // });
});

//CREATE - add a new team to DB
router.post("/dodaj", function (req, res) {
  const ids = req.body.ids;
  const name = req.body.name;
  const employee_ids = ids?.length > 0 ? ids : [];
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

// TODO add middleware - handling user roles
router.delete("/", function (req, res) {
  const id = req.body.id;

  Team.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      res.send({ status: err });
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  })
});

module.exports = router;
