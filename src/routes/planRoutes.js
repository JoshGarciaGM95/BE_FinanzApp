const express = require('express');
const { getListPlans } = require('../controllers/planController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/list', authenticate, getListPlans);

module.exports = router;