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

    router.get("/userProfile", function (req, res) {
        res.render("userProfile");
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

    router.get("/about", function (req, res) {
        res.render("about");
    });

    // passport.authenticate("local")
    router.get("/profile",  isAuthenticated, function (req, res) {

        db.Customer.findOne({
            where: {
              id: req.user.id
            }
          }).then(dbUser => {
            let {id, name, vegan, vegetarian, kosher, glutenIntolerance, city} = dbUser;
            const yelpURL = "https://api.yelp.com/v3/businesses/search";
            
            let categories = "";
            if (vegan) {
                categories += "Vegan";
            }
            if (vegetarian) {
                if (categories != "") {
                    categories += ",";
                }
                categories += "Vegetarian";
            }
            if (kosher) {
                if (categories != "") {
                    categories += ",";
                }
                categories += "Kosher";
            }
            if (glutenIntolerance) {
                if (categories != "") {
                    categories += ",";
                }
                categories += "Gluten-Free";
            }

            axios.get(yelpURL, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
                params: {
                    // term: 'tacos',
                    // sort_by: 'best_match' || rating || review_count || distance
                    // open_now
                    location: city,
                    term: `restaurants, ${categories}`,
                    // categories: categories,
                    limit: 6 // default returns 20 results
                }
            }).then((results) => {
                
                let restaurants = results.data.businesses;
                let customer = {
                    id: id,
                    name: name,
                    city: city,
                    vegan: vegan,
                    vegetarian: vegetarian,
                    kosher: kosher,
                    glutenIntolerance: glutenIntolerance
                }
                let profileObject = {user: customer, restaurants: restaurants};
                res.render("profile", profileObject);
            }).catch((error) => {
                console.log("Yelp call error: " + error);
            });
        }).catch((error) => {
            console.log("Profile error: " + error);
        });
    });

module.exports = router;