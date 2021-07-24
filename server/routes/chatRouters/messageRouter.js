import express from 'express';
import { saveMessage, getMessages } from '../../controllers/chatControllers/messageController.js'

const router = express.Router();

router.post('/', saveMessage);
router.get("/:conversationId", getMessages);

export default router;