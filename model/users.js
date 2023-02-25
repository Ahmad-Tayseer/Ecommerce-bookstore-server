"use strict";
const { sequelize, DataTypes } = require("./index");

const users = sequelize.define("userTbl", {
  username: { type: DataTypes.STRING, required: true, allowNull: false },
  email: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, required: true, allowNull: false },
  token: { type: DataTypes.VIRTUAL },
  role: { type: DataTypes.ENUM("admin", "client"), defaultValue: "client" },
  actions: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        admin: ["read", "create", "update", "delete"],
      };
      return acl[this.role];
    },
  },
  cart: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
  favourite: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
});

module.exports = { users };
