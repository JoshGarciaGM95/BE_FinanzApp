const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Branches = sequelize.define('Branches', {
    branch_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    branch_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 20,
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
    tableName: 'branches',
    timestamps: false
});

const createBranch = async (company_id, branch_name, adress, phone, status, creation_date) => {
    return await Branches.create({ company_id, branch_name, adress, phone, status, creation_date });
}

const getBranchById = async (branch_id) => {
    return await Branches.findOne({ where: { branch_id } });
}

const getAllBranches = async () => {
    return await Branches.findAll();
}

const getBranchByCompanyId = async (company_id) => {
    return await Branches.findAll({ where: { company_id } });
}

const updateBranch = async (branch_id, branch_name, adress, phone, status) => {
    return await Branches.update({ branch_name, adress, phone, status }, { where: { branch_id } });
}

const deleteBranch = async (branch_id) => {
    return await Branches.destroy({ where: { branch_id } });
}

const deleteBranchByCompanyId = async (company_id) => {
    return await Branches.destroy({ where: { company_id } });
}

module.exports = {
    createBranch,
    getBranchById,
    getAllBranches,
    getBranchByCompanyId,
    updateBranch,
    deleteBranch,
    deleteBranchByCompanyId
};