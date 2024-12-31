import express from 'express';
import * as authController from '../controller/authController.js';

const router = express.Router();

//login for customer
router.post('/login', authController.login);
//register
router.post('/register', authController.register);
//login for employee
router.post('/loginEmployee', authController.loginEmployee);
export default router;