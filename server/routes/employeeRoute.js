import express from 'express';
import * as employeeController from '../controller/employeeController.js';

const router = express.Router();
//create employee order
router.post('/order', employeeController.createEmployee);
//create chef
router.post('/chef', employeeController.createChef);
//get all employee
router.get('/all', employeeController.getAllEmployee);
//get one employee
router.get('/:id', employeeController.getOneEmployee);
//delete employee
router.delete('/:id', employeeController.deleteEmployee);
//update employee
router.put('/:id',employeeController.updateEmployee);

export default router;