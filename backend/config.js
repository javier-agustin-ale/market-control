import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const backendDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(backendDir, '.env') });

const dialect = (process.env.DB_DIALECT || 'sqlite').toLowerCase();
const isPostgres = dialect === 'postgres' || dialect === 'postgresql';

const sequelize = new Sequelize(
	process.env.DB_NAME || 'postgres',
	process.env.DB_USER || 'postgres',
	process.env.DB_PASS || '',
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
		dialect,
		storage: dialect === 'sqlite' ? (process.env.DB_STORAGE || './database.sqlite') : undefined,
		logging: false,
		dialectOptions: isPostgres
			? {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				}
			: undefined,
	}
);

export default sequelize;
