const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../models/Categories')

const allCategories = async (req, res) => {
    const { company_id } = req.query;
    try {
        if (!company_id) {
            return res.status(400).json({ error: 'company_id es requerido' });
        }
        const categories = await getAllCategories(company_id);
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los categories' });
    }
}

const getCategory = async (req, res) => {
    const { company_id } = req.query;
    const { id } = req.params;
    try {
        if (!company_id) {
            return res.status(400).json({ error: 'company_id es requerido' });
        }
        const category = await getCategoryById(id, company_id);
        if (!category) return res.status(404).json({ error: 'No encontrado o no autorizado' });
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
}

const create = async (req, res) => {
    const { company_id, category_name, description } = req.body;
    try {
        if (!company_id) {
            return res.status(400).json({ error: 'company_id es requerido' });
        }
        // Validar existencia de empresa aquí si es necesario
        const category = await createCategory({ company_id, category_name, description });
        res.status(201).json(category);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error al crear la categoría' });
    }
}

const update = async (req, res) => {
    const { company_id, category_name, description } = req.body;
    const { id } = req.params;
    try {
        if (!company_id) {
            return res.status(400).json({ error: 'company_id es requerido' });
        }
        const updated = await updateCategory(id, company_id, { category_name, description });
        if (!updated) return res.status(404).json({ error: 'No encontrado o no autorizado' });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error al actualizar la categoría' });
    }
}

const remove = async (req, res) => {
    const { company_id } = req.query;
    const { id } = req.params;
    try {
        if (!company_id) {
            return res.status(400).json({ error: 'company_id es requerido' });
        }
        const deleted = await deleteCategory(id, company_id);
        if (!deleted) return res.status(404).json({ error: 'No encontrado o no autorizado' });
        res.json({ message: 'Eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
}

module.exports = {
    allCategories,
    getCategory,
    create,
    update,
    remove
}