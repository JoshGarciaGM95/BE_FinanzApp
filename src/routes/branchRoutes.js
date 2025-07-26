const express = require('express');
const { newBranch } = require('../controllers/branchController');
const { authenticate } = require('../middleware/auth');
const { validateFlow } = require('../middleware/validateFlow');

const router = express.Router();

router.post('/create', authenticate, newBranch);
router.put('/update/:branchId', authenticate, newBranch);
router.delete('/delete/:branchId', authenticate, newBranch);

module.exports = router;