import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const SALT_ROUNDS = 12;
const AUTH_COOKIE_NAME = "authToken";

const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: Number(process.env.AUTH_COOKIE_MAX_AGE_MS) || 8 * 60 * 60 * 1000,
});

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "client",
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed.", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
    );

    res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    return res.status(200).json({
      message: "Login successful.",
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed.", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logout successful." });
};

export const getMe = async (req, res) => {
  try {
    const cookies = req.headers.cookie
      ? req.headers.cookie.split(";").map((c) => c.trim())
      : [];
    const matchingCookie = cookies.find((c) =>
      c.startsWith(`${AUTH_COOKIE_NAME}=`),
    );
    const token = matchingCookie
      ? decodeURIComponent(matchingCookie.split("=").slice(1).join("="))
      : null;

    if (!token) {
      return res.status(200).json({ user: null });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(200).json({ user: null });
    }

    const user = await User.findByPk(decoded.userId, {
      attributes: ["userId", "username", "email", "role"],
    });

    if (!user) {
      return res.status(200).json({ user: null });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve user.", error: error.message });
  }
};
