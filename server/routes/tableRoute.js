import express from 'express';
import * as tableController from '../controller/tableController';

const router = express.Router();

//create table
router.post('/', tableController.createTableController);
//get all table
router.get('/', tableController.getAllTableController);
//get one table
router.get('/:id', tableController.getOneTableController);
//update table
router.put('/:id', tableController.updateTableController);
//delete table
router.delete('/:id', tableController.deleteTableController);
export default router;