import express, { Request, Response } from "express";
import KeyValueTTL from "../structures/keyValueTTL.js";

const keyValueRouter = express.Router();
const keyValueTTL = new KeyValueTTL();

keyValueRouter.post("/add", (request: Request, response: Response) => {
	const { key, value, ttl } = request.body;

	if (!key || !value) {
		response.status(400).json({ error: "Key and value are required" });
	}

	const ttlInMillis = ttl ? Number(ttl) : undefined;
	keyValueTTL.set(key, value, ttlInMillis);

	response.status(201).json({ message: `Key "${key}" added successfully` });
});

keyValueRouter.get("/:key", (request: Request, response: Response) => {
	const { key } = request.params;
	const value = keyValueTTL.get(key);

	if (value === null) {
		response
			.status(404)
			.json({ error: `Key "${key}" not found or expired` });
	}

	response.json({ key, value });
});

keyValueRouter.delete("/:key", (request: Request, response: Response) => {
	const { key } = request.params;

	keyValueTTL.delete(key);

	response.json({ message: `Key "${key}" deleted successfully` });
});

export default keyValueRouter;
