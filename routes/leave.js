import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import { addLeave, getLeaveId, getAllLeaves ,leaveDetails, leaveUpdate} from '../controller/leaveController.js';
const router = express.Router();
router.post('/add',verifyToken, addLeave);
router.get('/:id',verifyToken, getLeaveId);
router.get('/',verifyToken, getAllLeaves);
router.get('/details/:id',verifyToken, leaveDetails);
router.put('/:id',verifyToken, leaveUpdate);
export default router ;