import express from 'express';
import { saveUser, getUser } from '../controllers/userController.js';

const router = express.Router();

// add new user in the database
router.post('/', saveUser);
router.get('/:userId', getUser);

export default router;