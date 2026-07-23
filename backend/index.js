import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import marketControlRoutes from "./routes/marketControlRoutes.js";
import { seedDefaultAdmin } from "./seeders/defaultAdminSeeder.js";
import { seedDefaultProducts } from "./seeders/defaultProductsSeeder.js";

import "./models/product.js";
import "./models/user.js";
import "./models/accountRequest.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/", marketControlRoutes);

const PORT = process.env.PORT || process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    await sequelize.sync();
    console.log("Database tables synchronized.");

    await seedDefaultAdmin();
    await seedDefaultProducts();

    app.listen(PORT, () => {
      console.log("Server is running in port " + PORT);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
};

startServer();
