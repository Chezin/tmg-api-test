import express from 'express';
import lifoRouter from './routes/lifo.route.js';
import keyValueRouter from './routes/keyvalue.route.js';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/lifo', lifoRouter);
app.use('/keyvalue', keyValueRouter);
app
	.listen(PORT, () => {
		console.log('Server running at PORT: ', PORT);
	})
	.on('error', (error) => {
		throw new Error(error.message);
	});
