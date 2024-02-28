const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const { accesChat, fetchChat, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat } = require('../controllers/chatControllers');

router.route("/").post(authMiddleware, accesChat);
router.route("/").get(authMiddleware, fetchChat);
router.route("/groupcreate").post(authMiddleware, createGroupChat);
router.route("/renamegroup").put(authMiddleware, renameGroupChat);
router.route("/groupadd").put(authMiddleware, addToGroupChat);
router.route("/groupremove").put(authMiddleware, removeFromGroupChat);
module.exports = router;