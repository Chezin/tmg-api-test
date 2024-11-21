import { Request, Response } from 'express';
import KeyValueTTL from '../models/keyValueTTL.js';

const keyValue = new KeyValueTTL();

export const addKeyValue = (req: Request, res: Response): void => {
	const { key, value, ttl } = req.body;

	if (!key || !value) {
		res.status(400).json({ error: 'Key and value are required' });
		return;
	}

	const ttlInSeconds = ttl ? Number(ttl) : undefined;
	keyValue.set(key, value, ttlInSeconds);

	res.status(201).json({ message: `Key "${key}" added successfully` });
};

export const getKeyValue = (req: Request, res: Response): void => {
	const { key } = req.params;

	if (!keyValue.has(key)) {
		res.status(404).json({ error: `Key "${key}" not found` });
		return;
	}

	const value = keyValue.get(key);

	res.json({ value });
};

export const deleteValue = (req: Request, res: Response): void => {
	const { key } = req.params;

	keyValue.delete(key);

	res.json({ message: `Value from "${key}" deleted successfully` });
};
