import express from 'express';
import * as employeeController from '../controller/employeeController.js';

const router = express.Router();
//create employee order
router.post('/order', employeeController.createEmployee);

export default router;