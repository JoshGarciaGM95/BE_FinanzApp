const express = require('express');
const { registerUser, loginUser, getListUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.get('/list', getListUsers);
router.post('/register', registerUser);

module.exports = router;