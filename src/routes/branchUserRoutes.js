const express = require('express');
const { newBranchUser } = require('../controllers/branchUserController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/create', authenticate, newBranchUser);

module.exports = router;