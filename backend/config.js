import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const backendDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(backendDir, '.env') });

const dialect = (process.env.DB_DIALECT || 'postgres').toLowerCase();
const isPostgres = dialect === 'postgres' || dialect === 'postgresql';
const isProduction = process.env.NODE_ENV === 'production';
const shouldUseSsl = Boolean(process.env.DATABASE_URL) || isProduction || (process.env.DB_HOST || '').includes('supabase') || (process.env.DB_HOST || '').includes('pooler');

const validateEnvironment = () => {
	const missing = [];

	if (!process.env.DATABASE_URL) {
		if (!process.env.DB_HOST) missing.push('DB_HOST');
		if (!process.env.DB_NAME) missing.push('DB_NAME');
		if (!process.env.DB_USER) missing.push('DB_USER');
		if (!process.env.DB_PASS) missing.push('DB_PASS');
	}

	if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
	if (!process.env.CLIENT_ORIGIN && isProduction) missing.push('CLIENT_ORIGIN');
	if (!process.env.RESEND_API_KEY && isProduction) missing.push('RESEND_API_KEY');
	if (!process.env.PERSONAL_EMAIL && isProduction) missing.push('PERSONAL_EMAIL');
	if (!process.env.PORT && !process.env.APP_PORT && isProduction) missing.push('PORT');

	if (missing.length > 0) {
		throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
	}
};

validateEnvironment();

const sequelizeOptions = {
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
	dialect,
	logging: false,
	dialectOptions: isPostgres
		? {
				...(shouldUseSsl
					? {
						ssl: {
							require: true,
							rejectUnauthorized: false,
						},
						}
					: {}),
			}
		: undefined,
};

const sequelize = process.env.DATABASE_URL
	? new Sequelize(process.env.DATABASE_URL, sequelizeOptions)
	: new Sequelize(
			process.env.DB_NAME || 'postgres',
		process.env.DB_USER || 'postgres',
		process.env.DB_PASS || '',
		sequelizeOptions,
	);

export default sequelize;
