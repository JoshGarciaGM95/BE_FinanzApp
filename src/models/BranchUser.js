const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BranchUser = sequelize.define('BranchUser', {
    branch_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    assigned_date: {
        type: DataTypes.DATE,
        allowNull: true,

    }
}, {
    tableName: 'BranchUsers',
    timestamps: false
});

const createBranchUser = async (branch_id, user_id, status, assigned_date) => {
    return await BranchUser.create({ branch_id, user_id, status, assigned_date });
}

const updateBranchUser = async (branch_user_id, branch_id, user_id, status) => {
    return await BranchUser.update({ branch_id, user_id, status }, { where: { branch_user_id } });
}

const deleteBranchUser = async (branch_user_id) => {
    return await BranchUser.destroy({ where: { branch_user_id } });
}

const getBranchUserById = async (branch_user_id) => {
    return await BranchUser.findOne({ where: { branch_user_id } });
}

const getAllBranchUsers = async () => {
    return await BranchUser.findAll();
}

const getBranchUsersByBranchId = async (branch_id) => {
    return await BranchUser.findAll({ where: { branch_id } });
}

module.exports = {
    createBranchUser,
    updateBranchUser,
    deleteBranchUser,
    getBranchUserById,
    getAllBranchUsers,
    getBranchUsersByBranchId
};