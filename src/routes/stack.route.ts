import express from 'express';
import { pushToStack, peekStack } from '../controllers/stack.controller.js';

const stackRouter = express.Router();

stackRouter.post('/add', pushToStack);
stackRouter.get('/', peekStack);

export default stackRouter;
