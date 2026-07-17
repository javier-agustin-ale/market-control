import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import marketControlRoutes from "./routes/marketControlRoutes.js";
import { seedDefaultAdmin } from "./seeders/defaultAdminSeeder.js";

import "./models/product.js";
import "./models/user.js";

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

sequelize
  .sync({ alter: true })
  .then(seedDefaultAdmin)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running in port " + PORT);
    });
  })
  .catch((err) => {
    console.log("DB connection failed: ", err);
  });
