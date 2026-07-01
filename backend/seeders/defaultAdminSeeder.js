import bcrypt from 'bcrypt';
import User from '../models/user.js';

const SALT_ROUNDS = 12;
const DEFAULT_ADMIN = {
	username: 'admin@market.com',
	email: 'admin@market.com',
	password: 'Password123!',
	role: 'admin',
};

export const seedDefaultAdmin = async () => {
	const userCount = await User.count();

	if (userCount > 0) {
		return;
	}

	const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, SALT_ROUNDS);

	await User.create({
		username: DEFAULT_ADMIN.username,
		email: DEFAULT_ADMIN.email,
		password: hashedPassword,
		role: DEFAULT_ADMIN.role,
	});

	console.log(`Default admin account created: ${DEFAULT_ADMIN.email}`);
};
