const express = require('express');
const { newCompany, getCompanyByUser } = require('../controllers/companyController');
const { authenticate } = require('../middleware/auth');
const { validateSubscription } = require('../middleware/validateFlow');

const router = express.Router();

router.post('/create', authenticate, newCompany);
router.post('/getByUser', authenticate, getCompanyByUser)

module.exports = router;