const path = require("path");
const router = require("express").Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app){

    // index route
    app.get("/login", function(req, res) {
        // res.sendFile(path.join(__dirname, "../public/login.html"));
        res.sendFile(path.join(__dirname, "../login.html"));
    });

    app.get("/signup", function(req, res) {
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
        res.sendFile(path.join(__dirname, "../signup.html"));
    });

    app.get("/profile", function(req, res) {
        // res.sendFile(path.join(__dirname, "../public/profile.html"));
        res.sendFile(path.join(__dirname, "../profile.html"));
    });

    app.get("*", function(req, res) {
        // res.sendFile(path.join(__dirname, "../public/login.html"));
        res.sendFile(path.join(__dirname, "../login.html"));
    });

};