const models = require("../models");

// API Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the customers
  app.get("/api/customers", function(req, res) {
    models.Customer.findAll({}).then(function(dbCustomers) {
      res.json(dbCustomers);
    });
  });

};