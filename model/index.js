require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// const postgress =
//   process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.URL;
const postgress = process.env.URL || "sqlite:memory:";

const sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          // ssl: {
          //   require: true,
          //   rejectUnauthorized: false,
          // },
        },
      }
    : {};

const sequelize = new Sequelize(postgress, sequelizeOptions);

module.exports = {
  sequelize,
  DataTypes,
};
