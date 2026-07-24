import app from '../app.js';
import sequelize from '../config.js';

let initialized = false;

const initializeDatabase = async () => {
  if (initialized) {
    return;
  }

  initialized = true;

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database initialized for serverless runtime.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  await initializeDatabase();
  return app(req, res);
}
