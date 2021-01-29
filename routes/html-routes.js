const path = require("path");
const router = require("express").Router();
const passport = require("../config/passport");
const axios = require("axios")
const API_KEY = process.env.DB_APIKEY


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");

// Routes
// =============================================================
// module.exports = function (app) {

    // index route
    router.get("/login", function (req, res) {
        res.render("index");
    });

    router.get("/signup", function (req, res) {
        res.render("signup");
    });

    // passport.authenticate("local")
    router.get("/profile",  function (req, res) {
        let yelpURL = "https://api.yelp.com/v3/businesses/search?categories=";
        if (req.user.vegan) {
            yelpURL += "Vegan";
        }
        if (req.user.vegetarian) {
            yelpURL += "Vegetarian";
        }
        if (req.user.kosher) {
            yelpURL += "Kosher";
        }
        if (req.user.glutenIntolerance) {
            yelpURL += "Gluten-Free";
        }
        yelpURL += `&location=${req.user.city}&limit=6`;

        axios.get(yelpURL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            }
        }).then((results) => {
            let restaurants = results.data.businesses;
            let profileObject = {user: req.user, restaurants: restaurants};

            res.render("profile", profileObject);
        }).catch((error) => {
            console.log(error);
          });

        
    });

    router.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("index");
    });

// };
module.exports = router;