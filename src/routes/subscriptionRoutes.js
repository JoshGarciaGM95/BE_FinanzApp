const express = require('express');
const { createNewSubscription, getListSubscriptions } = require('../controllers/subscriptionController');
const  { authenticate }  = require('../middleware/auth');
const { validateSubscription } = require('../middleware/validateSubscription');

const router = express.Router();

router.get('/list', authenticate, getListSubscriptions);
router.post('/create', authenticate, validateSubscription, createNewSubscription);

module.exports = router;