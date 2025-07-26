const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Plan = sequelize.define('Plan', {
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plan_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price_monthly: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: false,
    },
    price_yearly: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    max_users: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    max_branches: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    features: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'plans', // Nombre de la tabla en la base de datos
    timestamps: false
});

// Función para crear un plan
const createPlan = async (plan_name, price_monthly, price_yearly, max_users, max_branches, features, status, creation_date) => {
    return await Plan.create({ plan_name, price_monthly, price_yearly, max_users, max_branches, features, status, creation_date});
};

// Función para obtener un plan por ID
const getPlanById = async (plan_id) => {
    return await Plan.findOne({ where: { plan_id } });
};

// Función para obtener todos los planes
const getAllPlans = async () => {
    return await Plan.findAll();
};

// Función para actualizar un plan por ID
const updatePlanById = async (plan_id, plan_name, price_monthly, price_yearly, max_users, max_branches, features, status) => {
    return await Plan.update({ plan_name, price_monthly, price_yearly, max_users, max_branches, features, status }, { where: { plan_id } });
};

// Función para eliminar un plan por ID
const deletePlanById = async (plan_id) => {
    return await Plan.destroy({ where: { plan_id } });
};

const seedPlans = async () => {
  const count = await Plan.count();
  if (count === 0) {
    await Plan.bulkCreate([
      {
        plan_name: 'Básico',
        price_monthly: 10.00,
        price_yearly: 100.00,
        max_users: 3,
        max_branches: 1,
        features: 'Gestión básica de empresa y sucursal',
        status: 'active',
        creation_date: new Date()
      },
      {
        plan_name: 'Profesional',
        price_monthly: 25.00,
        price_yearly: 250.00,
        max_users: 10,
        max_branches: 5,
        features: 'Gestión avanzada, reportes y multi-sucursal',
        status: 'active',
        creation_date: new Date()
      },
      {
        plan_name: 'Premium',
        price_monthly: 50.00,
        price_yearly: 500.00,
        max_users: 50,
        max_branches: 20,
        features: 'Todas las funcionalidades, soporte prioritario',
        status: 'active',
        creation_date: new Date()
      }
    ]);
    console.log('Planes de ejemplo insertados.');
  } else {
    console.log('Ya existen planes en la base de datos, no se insertan duplicados.');
  }
};

module.exports = {
    Plan,
    createPlan,
    getPlanById,
    getAllPlans,
    updatePlanById,
    deletePlanById,
    seedPlans
};