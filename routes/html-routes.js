const path = require("path");
const router = require("express").Router();
const passport = require("../config/passport");
const axios = require("axios")
const API_KEY = process.env.DB_APIKEY


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");

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
        // REST
        axios.get("https://api.yelp.com/v3/businesses/search?categories=Vegetarian&location=Seattle&limit=6", {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            }
        }).then((results) => {

            console.log(results);
            res.render("profile", {user: req.user});

        });

        // res.sendFile(path.join(__dirname, "../public/profile.html"));
        // res.sendFile(path.join(__dirname, "../profile.html"));
        
    });

    router.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("index");
    });

// };
module.exports = router;