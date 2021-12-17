const express = require("express");

const router = express.Router();

const Service = require("../models/service");

//INDEX - show all reserved services
router.get("/", function (req, res) {
  Service.find({}, function (err, allServices) {
    if (err) {
      console.log(err);
    } else {
      if (req.xhr) {
        res.json(allServices);
      } else {
        res.render("services/index", { services: allServices, page: 'services' });
      }
    }
  });
});

module.exports = router;
