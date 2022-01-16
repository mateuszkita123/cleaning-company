const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require('cors');

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}
require("./utils/connectdb")

require("./strategies/LocalStrategy")
require("./strategies/JwtStrategy")
require("./authenticate")

const userRoutes = require("./routes/userRoutes");
const seedDB = require("./seeds");
const indexRoutes = require("./routes/index");
const servicesRoutes = require("./routes/services");
const usersRoutes = require("./routes/users");
const invoicesRoutes = require("./routes/invoices");
const invoicesDataRoutes = require("./routes/invoicesData");
const teamsRoutes = require("./routes/teams");
const accountRoutes = require("./routes/account");
const clientsRoutes = require("./routes/clients");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use(function (req, res, next) {
  console.log("res.locals: ", res.locals);
  console.log("res.locals.currentUser: ", res.locals.currentUser);
  res.locals.currentUser = req.user;
  next();
});

app.use("/users", userRoutes);
app.use("/konto", accountRoutes);
app.use("/uslugi", servicesRoutes);
app.use("/klienci", clientsRoutes);
app.use("/faktury", invoicesRoutes);
app.use("/zespoly", teamsRoutes);
app.use("/uzytkownicy", usersRoutes);
app.use("/dane_do_faktur", invoicesDataRoutes);
app.use("/", indexRoutes);

seedDB();

const server = app.listen(process.env.PORT || 8081, process.env.IP, () => {
  const port = server.address().port

  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
