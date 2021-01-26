require('dotenv').config();
const express = require("express");
const session = require("express-session");
var exphbs = require("express-handlebars");

// Requiring passport as we've configured it
const passport = require("./config/passport");

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
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// require("./routes/authroutes.js")(app);

const authRoutes = require("./routes/customer-routes");
// const htmlRoutes = require("./routes/htmlRoutes");
// const apiRoutes = require("./routes/api-routes");

// app.use(
//   authRoutes,
//   htmlRoutes,
//   apiRoutes
// );
app.use( authRoutes );

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
}).catch((err) => { throw err });
