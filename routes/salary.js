import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { addSalary ,getSalary } from '../controller/salaryController.js';
const router = express.Router();

router.post('/add',verifyToken , addSalary) ;
router.get('/:id',verifyToken , getSalary) ;

export default router ;