const path = require("path");
const router = require("express").Router();
const passport = require("../config/passport");
const axios = require("axios")
const db = require("../models");

const API_KEY = process.env.DB_APIKEY


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================

    router.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("index");
    });

    router.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.render("index");
    });

    router.get("/signup", function (req, res) {
        res.render("signup");
    });

    // passport.authenticate("local")
    router.get("/profile",  isAuthenticated, function (req, res) {

        db.Customer.findOne({
            where: {
              id: req.user.id
            }
          }).then(dbUser => {

            let yelpURL = "https://api.yelp.com/v3/businesses/search?term=restaurants&categories=";
            if (dbUser.vegan) {
                yelpURL += "Vegan";
            }
            if (dbUser.vegetarian) {
                yelpURL += "Vegetarian";
            }
            if (dbUser.kosher) {
                yelpURL += "Kosher";
            }
            if (dbUser.glutenIntolerance) {
                yelpURL += "Gluten-Free";
            }
            yelpURL += `&location=${dbUser.city}&limit=6`;
            // console.log("YELP: " + yelpURL);

            axios.get(yelpURL, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                }
            }).then((results) => {
                let restaurants = results.data.businesses;
                let customer = {
                    id: dbUser.id,
                    name: dbUser.name,
                    city: dbUser.city,
                    vegan: dbUser.vegan,
                    vegetarian: dbUser.vegetarian,
                    kosher: dbUser.kosher,
                    glutenIntolerance: dbUser.glutenIntolerance
                }
                let profileObject = {user: customer, restaurants: restaurants};

                res.render("profile", profileObject);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((err) => {
            console.log("profile error: " + err);
        });
    });

module.exports = router;