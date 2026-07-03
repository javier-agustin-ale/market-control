import jwt from 'jsonwebtoken';

const AUTH_COOKIE_NAME = 'authToken';

const getCookieValue = (cookieHeader, cookieName) => {
	if (!cookieHeader) {
		return null;
	}

	const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
	const matchingCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));

	if (!matchingCookie) {
		return null;
	}

	return decodeURIComponent(matchingCookie.split('=').slice(1).join('='));
};

/**
 * authenticate
 * Verifies the JWT from the auth cookie.
 * On success, attaches `req.user = { userId, role }` and calls next().
 * On failure, responds with 401.
 */
export const authenticate = (req, res, next) => {
	const token = getCookieValue(req.headers.cookie, AUTH_COOKIE_NAME);

	if (!token) {
		return res.status(401).json({ message: 'Authentication required. No token provided.' });
	}

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
