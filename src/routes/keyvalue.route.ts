import express from 'express';
import {
	addKeyValue,
	getKeyValue,
	deleteValue,
} from '../controllers/keyvalue.controller.js';

const keyValueRouter = express.Router();

keyValueRouter.post('/add', addKeyValue);
keyValueRouter.get('/:key', getKeyValue);
keyValueRouter.delete('/:key', deleteValue);

export default keyValueRouter;
