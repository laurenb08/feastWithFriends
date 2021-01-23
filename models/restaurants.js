const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require("../config");

const Restaurant = sequelize.define("Restaurant", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Restaurant;

