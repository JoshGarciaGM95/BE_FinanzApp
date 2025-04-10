const express = require('express');
const { newCompany } = require('../controllers/companyController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/create', authenticate, newCompany);

module.exports = router;