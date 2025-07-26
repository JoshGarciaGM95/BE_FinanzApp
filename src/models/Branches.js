const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { createBranchUser } = require('./BranchUser');
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
    address: {
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

const createBranch = async (company_id, branch_name, address, phone, status, creation_date, idUser) => {
    var branch = await Branches.create({ company_id, branch_name, address, phone, status, creation_date });
    await createBranchUser(branch.branch_id, idUser, 'active', new Date());
    return branch;
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

const getBranchesByIds = async (branchIds) => {
    return await Branches.findAll({ where: { branch_id: branchIds } });
}

const updateBranch = async (branch_id, branch_name, address, phone, status) => {
    return await Branches.update({ branch_name, address, phone, status }, { where: { branch_id } });
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
    ,getBranchesByIds
};