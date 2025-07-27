const express = require('express');
const { newBranch, getBranchByCompany } = require('../controllers/branchController');
const { authenticate } = require('../middleware/auth');
const { validateFlow } = require('../middleware/validateFlow');

const router = express.Router();

router.post('/create', authenticate, newBranch);
router.put('/update/:branch_Id', authenticate, newBranch);
router.delete('/delete/:branch_Id', authenticate, newBranch);
router.get('/byCompany/:company_Id', authenticate, getBranchByCompany);

module.exports = router;