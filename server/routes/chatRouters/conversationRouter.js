import express from 'express';
import { saveConversation, getConversationOfUser } from '../../controllers/chatControllers/conversationController.js';

const router = express.Router();

router.post('/', saveConversation);
router.get('/:userId', getConversationOfUser);

export default router;