const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Products = sequelize.define('Products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    tableName: 'products',
    timestamps: false
});

const createProduct = async (company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date) => {
    return await Products.create({ company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date });
}

const getProductById = async (product_id, company_id) => {
    return await Products.findOne({
        where: { product_id, company_id }
    });
}

const getAllProducts = async (company_id) => {
    return await Products.findAll({ where: { company_id } });
}

const updateProduct = async (product_id, updates) => {
    return await Products.update(updates, {
        where: { product_id }
    });
}

const deleteProduct = async (product_id) => {
    return await Products.destroy({
        where: { product_id }
    });
}


module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
};