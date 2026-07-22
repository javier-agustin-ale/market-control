import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected route — returns current user session info ( returns null if unauthenticated)
router.get("/me", authController.getMe);

export default router;
