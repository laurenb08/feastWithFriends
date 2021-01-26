const {Sequelize, Model, DataTypes} = require("sequelize");
// const sequelize = require("../config/index");

module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Restaurant;
};


