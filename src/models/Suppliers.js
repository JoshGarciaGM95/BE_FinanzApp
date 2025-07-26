const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Suppliers = sequelize.define('Suppliers', {
  supplier_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company_id: { type: DataTypes.INTEGER, allowNull: false },
  supplier_name: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(255) },
  address: { type: DataTypes.TEXT }
}, {
  tableName: 'suppliers',
  timestamps: false
});

const getAllSuppliers = async (company_id) => {
  return await Suppliers.findAll({ where: { company_id } });
}

const getSupplierById = async (supplier_id, company_id) => {
  return await Suppliers.findOne({ where: { supplier_id, company_id } });
}

const createSupplier = async (data) => {
  return await Suppliers.create(data);
}

const updateSupplier = async (supplier_id, company_id, updates) => {
  const supplier = await Suppliers.findOne({ where: { supplier_id, company_id } });
  if (!supplier) return null;
  await supplier.update(updates);
  return supplier;
}

const deleteSupplier = async (supplier_id, company_id) => {
  const supplier = await Suppliers.findOne({ where: { supplier_id, company_id } });
  if (!supplier) return null;
  await supplier.destroy();
  return true;
}

module.exports = {
  Suppliers,
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
