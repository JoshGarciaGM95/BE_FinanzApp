const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Payments = sequelize.define('Payments', {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sale_id: { type: DataTypes.INTEGER, allowNull: false },
  payment_method: { type: DataTypes.STRING(20), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'payments',
  timestamps: false
});

const getAllPayments = async (company_id, branch_id) => {
  return await Payments.findAll({ where: { company_id, branch_id } });
}

const getPaymentById = async (payment_id, company_id, branch_id) => {
  return await Payments.findOne({ where: { payment_id, company_id, branch_id } });
}

const createPayment = async (data) => {
  return await Payments.create(data);
}

const updatePayment = async (payment_id, company_id, branch_id, updates) => {
  const payment = await Payments.findOne({ where: { payment_id, company_id, branch_id } });
  if (!payment) return null;
  await payment.update(updates);
  return payment;
}

const deletePayment = async (payment_id, company_id, branch_id) => {
  const payment = await Payments.findOne({ where: { payment_id, company_id, branch_id } });
  if (!payment) return null;
  await payment.destroy();
  return true;
}

module.exports = {
  Payments,
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
