const express = require('express');
const { createNewSubscription, getListSubscriptions, getSubscriptionByUser } = require('../controllers/subscriptionController');
const  { authenticate }  = require('../middleware/auth');
const { validateFlow, validateAdmin } = require('../middleware/validateFlow');

const router = express.Router();

router.get('/list', authenticate, getListSubscriptions);
router.post('/create', authenticate, createNewSubscription);
router.post('/ByUser', authenticate, getSubscriptionByUser);

module.exports = router;