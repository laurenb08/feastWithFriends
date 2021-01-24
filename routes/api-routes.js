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

  // POST route for saving a new customer
  app.post("/api/customers", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    models.Customer.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      vegan: req.body.vegan,
      lactoseIntolerance: req.body.lactoseIntolerance,
      vegetarian: req.body.vegetarian,
      nutAllergy: req.body.nutAllergy,
      glutenIntolerance: req.body.glutenIntolerance,
      shellfishAllergy: req.body.shellfishAllergy,
      kosher: req.body.kosher
    }).then(function(dbCustomers) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCustomers);
    });
  });

  // DELETE route for deleting customers (get the id of the todo to be deleted from req.params.id)
  app.delete("/api/customers/:id", function(req, res) {
    models.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCustomers) {
      res.json(dbCustomers);
    });
  });

   // PUT route for updating customers. We can get the updated todo data from req.body
   app.put("/api/customers", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    models.Customer.update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      vegan: req.body.vegan,
      lactoseIntolerance: req.body.lactoseIntolerance,
      vegetarian: req.body.vegetarian,
      nutAllergy: req.body.nutAllergy,
      glutenIntolerance: req.body.glutenIntolerance,
      shellfishAllergy: req.body.shellfishAllergy,
      kosher: req.body.kosher
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbCustomers) {
      res.json(dbCustomers);
    });
  });


};