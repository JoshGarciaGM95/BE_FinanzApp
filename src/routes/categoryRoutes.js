const express = require('express');
const { allCategories } = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/getAll', authenticate, allCategories)

module.exports = router;