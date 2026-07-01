import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const SALT_ROUNDS = 12;

/**
 * POST /api/auth/register
 * Creates a new user with a hashed password.
 * Anyone can register; role defaults to 'client'.
 */
export const register = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ message: 'username, email and password are required.' });
		}

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(409).json({ message: 'A user with this email already exists.' });
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			// Only allow 'client' from public registration; role override is ignored for safety
			role: 'client',
		});

		return res.status(201).json({
			message: 'User registered successfully.',
			user: {
				userId: newUser.userId,
				username: newUser.username,
				email: newUser.email,
				role: newUser.role,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'Registration failed.', error: error.message });
	}
};

/**
 * POST /api/auth/login
 * Validates credentials and returns a signed JWT on success.
 */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'email and password are required.' });
		}

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const token = jwt.sign(
			{ userId: user.userId, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
		);

		return res.status(200).json({
			message: 'Login successful.',
			token,
			user: {
				userId: user.userId,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'Login failed.', error: error.message });
	}
};

/**
 * GET /api/auth/me
 * Returns the profile of the currently authenticated user.
 * Protected by the `authenticate` middleware.
 */
export const getMe = async (req, res) => {
	try {
		const user = await User.findByPk(req.user.userId, {
			attributes: ['userId', 'username', 'email', 'role'],
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to retrieve user.', error: error.message });
	}
};
