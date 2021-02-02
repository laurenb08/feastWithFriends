// kept for future development
const {Sequelize, Model, DataTypes} = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Restaurant;
};


