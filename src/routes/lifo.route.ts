import express, { Request, Response } from 'express';
import Stack from '../structures/stack.js';

const lifoRouter = express.Router();
const stack = new Stack<string>();

lifoRouter.post('/add', (request: Request, response: Response) => {
	const { element } = request.body;
	if (!element) {
		response.status(400).json({ error: 'Element is required' });
	}
	stack.push(element);

	response.send();
});

lifoRouter.get('/', (request: Request, response: Response) => {
	response.json(stack.peek());
	stack.pop();
});

export default lifoRouter;
