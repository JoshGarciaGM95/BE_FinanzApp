const express = require('express');
const { getListPlans, getPlanByIdController } = require('../controllers/planController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/list', authenticate, getListPlans);
router.post('/ById', authenticate, getPlanByIdController);

module.exports = router;