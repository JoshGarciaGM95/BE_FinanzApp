const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SaleDetails = sequelize.define('SaleDetails', {
  detail_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sale_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, {
  tableName: 'saledetails',
  timestamps: false
});

module.exports = SaleDetails;
