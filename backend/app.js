const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const moment = require('moment');
const cors = require('cors');
require('moment/locale/pl');

const seedDB = require("./seeds");
const indexRoutes = require("./routes/index");
const servicesRoutes = require("./routes/services");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/userRoutes");
const invoicesRoutes = require("./routes/invoices");
const invoicesDataRoutes = require("./routes/invoicesData");
const teamsRoutes = require("./routes/teams");
const accountRoutes = require("./routes/account");
const clientsRoutes = require("./routes/clients");

const app = express();

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}
require("./utils/connectdb")
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

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

app.use(cors(corsOptions));
app.use(passport.initialize());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.locals.moment = moment;

seedDB();

app.use(require("express-session")({
  secret: "Cleaning Master firma sprzątająca",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/konto", accountRoutes);
app.use("/uslugi", servicesRoutes);
app.use("/klienci", clientsRoutes);
app.use("/faktury", invoicesRoutes);
app.use("/zespoly", teamsRoutes);
app.use("/uzytkownicy", usersRoutes);
app.use("/dane_do_faktur", invoicesDataRoutes);

const server = app.listen(process.env.PORT || 4000, process.env.IP, () => {
  const port = server.address().port

  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
