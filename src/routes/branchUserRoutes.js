const express = require('express');
const { newBranchUser } = require('../controllers/branchUserController');
const { authenticate } = require('../middleware/auth');
const { validateBranch } = require('../middleware/validateFlow');

const router = express.Router();

router.post('/asign', authenticate, newBranchUser);

module.exports = router;