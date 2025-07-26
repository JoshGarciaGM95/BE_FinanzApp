const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Roles = sequelize.define('Roles', {
  role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Roles;
