// kept for future development
const {Sequelize, Model, DataTypes} = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
        // name, id and image_url from Yelp api call data
        yelp_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yelp_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yelp_image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yelp_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Customer can have many favorite restaurants
    Restaurant.associate = function(models) {
        Restaurant.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
              }
            })
    };

    return Restaurant;
};


