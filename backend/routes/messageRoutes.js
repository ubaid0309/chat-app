const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage, getAllMessages } = require('../controllers/messageControllers');

const router = express.Router();

router.route('/').post(authMiddleware, sendMessage);
router.route('/:chatId').get(authMiddleware, getAllMessages);



module.exports = router;