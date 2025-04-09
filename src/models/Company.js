const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define('Company', {
    Company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 20,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'companies',
    timestamps: false
});

const createCompany = async (user_id, Company_name, contact_email, contact_phone, address, registration_date, status) => {
    return await Company.create({ user_id, Company_name, contact_email, contact_phone, address, registration_date, status });
}

const getCompanyById = async (Company_id) => {
    return await Company.findOne({ where: { Company_id } });
}

const getAllCompanies = async () => {
    return await Company.findAll();
}

const getCompanyByUserId = async (user_id) => {
    return await Company.findOne({ where: { user_id } });
}

const updateCompany = async (Company_id, Company_name, contact_email, contact_phone, address, registration_date, status) => {
    return await Company.update({ Company_name, contact_email, contact_phone, address, registration_date, status }, { where: { Company_id } });
}

const deleteCompany = async (Company_id) => {
    return await Company.destroy({ where: { Company_id } });
}

const deleteCompanyByUserId = async (user_id) => {
    return await Company.destroy({ where: { user_id } });
}



