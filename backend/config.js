import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dialect = process.env.DB_DIALECT || 'sqlite';

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect,
		storage: dialect === 'sqlite' ? (process.env.DB_STORAGE || './database.sqlite') : undefined,
		logging: false,
	}
);

export default sequelize;
