"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: "customerID",
        as: "customer",
      });
      Order.belongsTo(models.Voucher, {
        foreignKey: "voucherID", 
        as: "voucher",
      });
      Order.belongsTo(models.Table, {
        foreignKey: "tableID",
        as: "table",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "orderID",
        as: "orderDetails",
      });
      Order.hasMany(models.Notify, {
        foreignKey: "orderID",
        as: "notifies",
      });
    }
  }
  Order.init(
    {
      voucherID: DataTypes.INTEGER,
      customerID: DataTypes.INTEGER,
      tableID: DataTypes.INTEGER,
      status: DataTypes.STRING,
      total: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
