const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const moment = require('moment');
const cors = require('cors');
require('moment/locale/pl');

const User = require("./models/user");
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

const PORT = 4000;

mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/cleaning-company';

mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.locals.moment = moment;

seedDB();

app.use(require("express-session")({
  secret: "Cleaning Master firma sprzątająca",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use("/", indexRoutes);
app.use("/konto", accountRoutes);
app.use("/uslugi", servicesRoutes);
app.use("/klienci", clientsRoutes);
app.use("/faktury", invoicesRoutes);
app.use("/zespoly", teamsRoutes);
app.use("/uzytkownicy", usersRoutes);
app.use("/dane_do_faktur", invoicesDataRoutes);

app.listen(process.env.PORT || PORT, process.env.IP, () => {
  console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
