const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.get('/me', protect, getUser);
router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
