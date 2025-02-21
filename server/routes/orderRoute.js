import express from 'express';
import * as orderController from '../controller/orderController';


const router = express.Router();

//create order
router.post('/', orderController.createOrderController);

//get order
router.get('/:id', orderController.getOrderController);

//create order detail
router.post('/detail', orderController.createOrderDetailController);

export default router;  