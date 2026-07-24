import cors from "cors";
import express from "express";
import "./config.js";
import authRoutes from "./routes/authRoutes.js";
import marketControlRoutes from "./routes/marketControlRoutes.js";

import "./models/product.js";
import "./models/user.js";
import "./models/accountRequest.js";

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || (process.env.NODE_ENV === "production" ? null : "http://localhost:5173");
const corsOrigin = allowedOrigin || (process.env.NODE_ENV === "production" ? false : ["http://localhost:5173", "http://127.0.0.1:5173"]);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/", marketControlRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled server error:", err);
  return res.status(500).json({ message: "Internal server error." });
});

export default app;
