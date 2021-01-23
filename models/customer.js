// module.exports = function(sequelize, DataTypes) {

const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require("../config");

  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    lactoseIntolerance: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    nutAllergy: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    glutenIntolerance: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    shellfishAllergy: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    kosher: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });

  module.exports = Customer;