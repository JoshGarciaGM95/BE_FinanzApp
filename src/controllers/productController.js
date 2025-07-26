const {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../models/Products');

const newProduct = async (req, res) => {
    const { company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date } = req.body;
    try {
        const product = await createProduct(company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

const getProduct = async (req, res) => {
    const { product_id } = req.params;
    const { company_id } = req.query;
    try {
        if (!company_id) {
            return res.status(400).json({ message: 'company_id es requerido' });
        }
        const product = await getProductById(product_id, company_id);
        if (!product) return res.status(404).json({ message: 'No encontrado o no autorizado' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
}

const getProducts = async (req, res) => {
    const { company_id } = req.query;
    try {
        if (!company_id) {
            return res.status(400).json({ message: 'company_id es requerido' });
        }
        const products = await getAllProducts(company_id);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
}

const editProduct = async (req, res) => {
    const { product_id } = req.params;
    const { company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date } = req.body;
    try {
        if (!company_id) {
            return res.status(400).json({ message: 'company_id es requerido' });
        }
        // Validar que el producto pertenezca a la empresa
        const productFound = await getProductById(product_id, company_id);
        if (!productFound) return res.status(404).json({ message: 'No encontrado o no autorizado' });
        const product = await updateProduct(product_id, { company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}

const dropProduct = async (req, res) => {
    const { product_id } = req.params;
    const { company_id } = req.query;
    try {
        if (!company_id) {
            return res.status(400).json({ message: 'company_id es requerido' });
        }
        const productFound = await getProductById(product_id, company_id);
        if (!productFound) return res.status(404).json({ message: 'No encontrado o no autorizado' });
        await deleteProduct(product_id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}

module.exports = {
    newProduct,
    getProduct,
    getProducts,
    editProduct,
    dropProduct
}