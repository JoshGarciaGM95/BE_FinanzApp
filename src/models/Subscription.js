const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscription = sequelize.define('Subscription', {
    subscription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'subscriptions',
    timestamps: false
});

// Función para crear una suscripción
const createSubscription = async (user_id, plan_id, start_date, end_date, status, payment_method) => {
    return await Subscription.create({ user_id, plan_id, start_date, end_date, status, payment_method });
};

// Función para obtener una suscripción por ID
const getSubscriptionById = async (subscription_id) => {
    return await Subscription.findOne({ where: { subscription_id } });
};

// Función para obtener todas las suscripciones
const getAllSubscriptions = async () => {
    return await Subscription.findAll();
}

// Función para obtener todas las suscripciones de un usuario
const getSubscriptionByUserId = async (user_id) => {
    return await Subscription.findOne({ where: { user_id: user_id, status: 'active' } });
}

// Función para actualizar una suscripción
const updateSubscription = async (subscription_id, user_id, plan_id, start_date, end_date, status, payment_method) => {
    return await Subscription.update({ user_id, plan_id, start_date, end_date, status, payment_method }, { where: { subscription_id } });
};

module.exports = {
    createSubscription,
    getSubscriptionById,
    getAllSubscriptions,
    getSubscriptionByUserId,
    updateSubscription
};