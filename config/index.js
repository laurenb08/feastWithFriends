require('dotenv').config();

const Sequelize = require("sequelize");
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    port: 3306
  })
}
module.exports = sequelize;

// formerly config.json
// {
//   "development": {
//     "username": "root",
//     "password": process.env.DB_PASS,
//     "database": "feastwithfriends",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
