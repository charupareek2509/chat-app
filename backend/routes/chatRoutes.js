const express = require('express');

const {protect} = require('../middleware/auth');
const router = express.Router();
const {accessChat} = require('../controller/chat.controller');

router.route('/').post(protect, accessChat)
// router.route('/').get(protect, fetchChats)
// router.route('/group').post(protect, createGroup)
// router.route('/rename').post(protect, renameGroup)
// router.route('/group-remove').put(protect, removeFromGroup)
// router.route('/group-add').put(protect, addToGroup)

module.exports = router