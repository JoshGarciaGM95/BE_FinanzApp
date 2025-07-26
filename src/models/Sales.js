const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Sales = sequelize.define('Sales', {
  sale_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company_id: { type: DataTypes.INTEGER, allowNull: false },
  branch_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, {
  tableName: 'sales',
  timestamps: false
});

const getAllSales = async (company_id, branch_id) => {
  return await Sales.findAll({ where: { company_id, branch_id } });
}

const getSaleById = async (sale_id, company_id, branch_id) => {
  return await Sales.findOne({ where: { sale_id, company_id, branch_id } });
}

const createSale = async (data) => {
  return await Sales.create(data);
}

const updateSale = async (sale_id, company_id, branch_id, updates) => {
  const sale = await Sales.findOne({ where: { sale_id, company_id, branch_id } });
  if (!sale) return null;
  await sale.update(updates);
  return sale;
}

const deleteSale = async (sale_id, company_id, branch_id) => {
  const sale = await Sales.findOne({ where: { sale_id, company_id, branch_id } });
  if (!sale) return null;
  await sale.destroy();
  return true;
}

module.exports = {
  Sales,
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
