import app from "./app.js";
import sequelize from "./config.js";

const PORT = process.env.PORT || process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    await sequelize.sync();
    console.log("Database tables synchronized.");

    app.listen(PORT, () => {
      console.log("Server is running in port " + PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
