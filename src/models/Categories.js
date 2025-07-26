const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categories = sequelize.define('categories', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'categories', 
    timestamps: false
});

const getAllCategories = async (company_id) => {
    return await Categories.findAll({ where: { company_id } });
}

const getCategoryById = async (category_id, company_id) => {
    return await Categories.findOne({ where: { category_id, company_id } });
}

const createCategory = async (data) => {
    return await Categories.create(data);
}

const updateCategory = async (category_id, company_id, updates) => {
    const category = await Categories.findOne({ where: { category_id, company_id } });
    if (!category) return null;
    await category.update(updates);
    return category;
}

const deleteCategory = async (category_id, company_id) => {
    const category = await Categories.findOne({ where: { category_id, company_id } });
    if (!category) return null;
    await category.destroy();
    return true;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};