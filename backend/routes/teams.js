const express = require("express");

const router = express.Router();

const Team = require("../models/team");
const User = require("../models/user");
const { UserRoles } = require("../constans");

const { verifyUser, hasEmployeePermissions } = require("../authenticate")

const getTeamDataFromRequest = (req) => {
  const ids = req.body.ids;
  const name = req.body.name;
  const employee_ids = ids?.length > 0 ? ids : [];
  return ({ name: name, employee_id: employee_ids });
}

//INDEX - show all teams
router.get("/", verifyUser, hasEmployeePermissions, function (req, res) {
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

//NEW - show form to create new team
router.get("/dodaj", verifyUser, hasEmployeePermissions, function (req, res) {
  User.find({ role_id: UserRoles.USER }, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      const users = allUsers.map(elem => ({ _id: elem._id.toString(), firstName: elem.firstName, lastName: elem.lastName }));
      res.json(users);
    }
  });
});

//CREATE - add a new team to DB
router.post("/dodaj", verifyUser, hasEmployeePermissions, function (req, res) {
  const newTeam = getTeamDataFromRequest(req);

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

router.get("/edytuj/:id", verifyUser, hasEmployeePermissions, function (req, res) {
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
});

// UPDATE - updates selected team
router.put("/edytuj/:id", verifyUser, hasEmployeePermissions, function (req, res) {
  const newTeam = getTeamDataFromRequest(req);

  console.log("newTeam: ", newTeam);
  Team.findByIdAndUpdate(req.params.id, { $set: newTeam }, function (err, team) {
    if (err) {
      console.log(err);
    } else {
      res.status(200);
      res.send({ status: "Success" });
    }
  });
});

// DELETE - deletes selected team
router.delete("/", verifyUser, hasEmployeePermissions, function (req, res) {
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
