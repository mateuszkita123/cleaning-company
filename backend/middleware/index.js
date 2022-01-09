module.exports = {
  isAdmin: function (req, res, next) {
    if (req.currentUser?.role_id === "Admin") {
      next();
    } else {
      res.statusCode = 401;
      res.send({
        name: "UserRoleError",
        message: "Musisz być Administratorem, żeby wykonać taką czynność",
      });
    }
  },
}