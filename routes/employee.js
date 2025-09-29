import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import {addEmployee, updateEmployee,upload ,fechDepartmentByDepId , getEmployees, getEmployeeById } from '../controller/employeeController.js';
 
const router = express.Router();

router.post('/add',verifyToken,upload.single('image'),addEmployee);
router.get('/',verifyToken ,getEmployees);
router.get('/:id',verifyToken ,getEmployeeById);
router.put('/:id',verifyToken ,updateEmployee);
router.get('/department/:id',verifyToken ,fechDepartmentByDepId);
// router.delete('/:id',verifyToken ,deleteDepartment);



export default router ;