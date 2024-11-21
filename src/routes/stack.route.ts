import express from 'express';
import { pushToStack, popStack } from '../controllers/stack.controller.js';

const stackRouter = express.Router();

stackRouter.post('/add', pushToStack);
stackRouter.get('/', popStack);

export default stackRouter;
