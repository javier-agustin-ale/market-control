import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config.js';
import marketControlRoutes from './routes/marketControlRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/', marketControlRoutes);

const PORT = process.env.APP_PORT || 3000;

sequelize
	.sync({ alter: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log('Server is running in port ' + PORT);
		});
	})
	.catch((err) => {
		console.log('DB connection failed: ', err);
	});
