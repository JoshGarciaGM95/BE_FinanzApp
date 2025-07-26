const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: false
});

// Función para crear un usuario
const createUser = async (username, email, password, role_id, status, creation_date) => {
    return await User.create({ username, email, password, role_id, status, creation_date});
};

//
const createRegisteredUser = async (username, email, password, role_id, status, creation_date) => {
    return await User.create({ username, email, password, role_id, status, creation_date});
};
  

// Función para obtener un usuario por email
const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email }});
};

//Funcion para obtener todos los usuarios
const getAllUsers = async () => {
    return await User.findAll();
};

module.exports = {
  createUser,
  getUserByEmail,
  createRegisteredUser,
  getAllUsers
};