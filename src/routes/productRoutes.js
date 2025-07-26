const express = require('express');
const { newProduct,
    getProduct,
    getProducts,
    editProduct,
    dropProduct } = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/new', authenticate, newProduct);
router.get('/get/:product_id', authenticate, getProduct);
router.get('/list', authenticate, getProducts);
router.put('/update/:product_id', authenticate, editProduct);
router.delete('/delete/:product_id', authenticate, dropProduct);

module.exports = router;