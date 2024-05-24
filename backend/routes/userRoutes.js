const express = require('express');
const {registerUser, authUser, allUser} = require('../controller/user.controller');
const {protect} = require('../middleware/auth');
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUser)
router.post('/login', authUser)

module.exports = router