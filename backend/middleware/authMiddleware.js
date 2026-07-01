import jwt from 'jsonwebtoken';

/**
 * authenticate
 * Verifies the JWT from the Authorization header.
 * On success, attaches `req.user = { userId, role }` and calls next().
 * On failure, responds with 401.
 */
export const authenticate = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Authentication required. No token provided.' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: decoded.userId, role: decoded.role };
		next();
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Token expired. Please log in again.' });
		}
		return res.status(401).json({ message: 'Invalid token.' });
	}
};

/**
 * requireAdmin
 * Must be used AFTER the `authenticate` middleware.
 * Checks that the authenticated user has the 'admin' role.
 * On failure, responds with 403.
 */
export const requireAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Forbidden. Admin access required.' });
	}
	next();
};
