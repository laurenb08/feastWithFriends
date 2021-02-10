// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

const { Sequelize, Model, DataTypes} = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Seattle"
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    glutenIntolerance: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    kosher: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }

  });

  // Customer can have many favorite restaurants
  Customer.associate = function(models) {
    Customer.hasMany(models.Restaurant, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Customer.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Customer.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Customer;
};
