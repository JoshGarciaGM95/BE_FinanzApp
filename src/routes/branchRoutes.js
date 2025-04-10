const express = require('express');
const { newBranch } = require('../controllers/branchController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/create', authenticate, newBranch);

module.exports = router;