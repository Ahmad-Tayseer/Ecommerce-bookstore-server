const { sequelize, DataTypes } = require("./index");

const contacts = sequelize.define("contactTbl", {
  name: { type: DataTypes.STRING, required: true, allowNull: false },
  email: { type: DataTypes.STRING, required: true, allowNull: false },
  subject: { type: DataTypes.STRING, required: true, allowNull: false },
  message: { type: DataTypes.STRING, required: true, allowNull: false },
});

module.exports = { contacts };
