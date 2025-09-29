import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import { updatePassword } from '../controller/settingController.js';
const router = express.Router();

router.put('/',verifyToken , updatePassword);

export default router ;