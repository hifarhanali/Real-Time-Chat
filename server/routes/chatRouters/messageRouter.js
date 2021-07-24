import express from 'express';
import { saveMessage, getMessages, deleteMessage } from '../../controllers/chatControllers/messageController.js'

const router = express.Router();

router.post('/', saveMessage);
router.get("/:conversationId", getMessages);
router.delete("/", deleteMessage);

export default router;