import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import {addDepartment ,getdepartments, getDepartmentById,updateDepartment ,deleteDepartment} from '../controller/departmentController.js';
const router = express.Router();

router.post('/add',verifyToken ,addDepartment);
router.get('/',verifyToken ,getdepartments);
router.get('/:id',verifyToken ,getDepartmentById);
router.put('/:id',verifyToken ,updateDepartment);
router.delete('/:id',verifyToken ,deleteDepartment);



export default router ;