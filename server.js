require('dotenv').config();
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const exphbsSections = require("express-handlebars-sections");

// Requiring passport as we've configured it
const passport = require("./config/passport");
// const path = require("path"); do we need this?

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// const sequelize = require("./config/config.json");
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set handlebars
const hbs = exphbs.create({ defaultLayout: "main"});
exphbsSections(hbs);
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public"))); // use this one instead?

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
const customerRoutes = require("./routes/html-routes.js");
const authRoutes = require("./routes/customer-routes");
app.use( customerRoutes, authRoutes );

// use first one to reset database during testing, otherwise use second line
// db.sequelize.sync({ force: true }).then(function () {
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
}).catch((err) => { throw err });
