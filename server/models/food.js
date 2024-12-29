"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "category",
      });
      Food.hasMany(models.OrderDetail, {
        foreignKey: "foodID",
        as: "orderDetails",
      });
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      description: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
