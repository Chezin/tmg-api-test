import { Request, Response } from 'express';
import Stack from '../models/stack.js';

const stack = new Stack();

export const pushToStack = (req: Request, res: Response): void => {
	const item = req.body.item;
	stack.push(item);

	res.status(200).json({ message: 'Item pushed to stack', item });
};

export const peekStack = (req: Request, res: Response): void => {
	const topItem = stack.peek();

	if (!topItem) {
		res.status(404).json({ message: 'Stack is empty' });
	}

	res.status(200).json({ item: topItem });
};
