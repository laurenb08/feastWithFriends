const path = require("path");
const router = require("express").Router();
const passport = require("../config/passport");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
// module.exports = function (app) {

    // index route
    router.get("/login", function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/login.html"));
        // res.sendFile(path.join(__dirname, "../login.html"));
        res.render("index");
    });

    router.get("/signup", function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
        // res.sendFile(path.join(__dirname, "../signup.html"));
        res.render("signup");
    });

    // passport.authenticate("local")
    router.get("/profile",  function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/profile.html"));
        // res.sendFile(path.join(__dirname, "../profile.html"));
        res.render("profile", {user: req.user});
    });

    router.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("index");
    });

// };
module.exports = router;