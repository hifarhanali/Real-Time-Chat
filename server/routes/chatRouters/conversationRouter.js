import express from 'express';
import { saveConversation, getConversationOfUser, updateConversationLastMessageTime } from '../../controllers/chatControllers/conversationController.js';

const router = express.Router();

router.post('/', saveConversation);
router.get('/:userId', getConversationOfUser);
router.put('/', updateConversationLastMessageTime);

export default router;