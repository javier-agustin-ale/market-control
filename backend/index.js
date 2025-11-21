import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config.js';
import haiilomarktRoutes from './routes/haiilomarktRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/haiilomarkt', haiilomarktRoutes);

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
