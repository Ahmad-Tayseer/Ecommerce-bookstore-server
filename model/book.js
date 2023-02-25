const { sequelize, DataTypes } = require("./index");
const books = sequelize.define("bookTbl", {
  name: { type: DataTypes.STRING, required: true, allowNull: false },
  author: { type: DataTypes.STRING, required: true, allowNull: false },
  image: { type: DataTypes.STRING, required: true, allowNull: false },
  price: { type: DataTypes.STRING, required: true, allowNull: false },
  description: { type: DataTypes.STRING, required: true, allowNull: false },
  topSelling: { type: DataTypes.BOOLEAN, required: true, defaultValue: false },
  rating: { type: DataTypes.STRING, required: true, allowNull: false },
  reviews: { type: DataTypes.STRING },
});

module.exports = { books };
