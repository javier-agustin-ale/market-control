import sequelize from './config.js';
import './models/product.js';
import './models/user.js';
import { seedDefaultAdmin } from './seeders/defaultAdminSeeder.js';
import { seedDefaultProducts } from './seeders/defaultProductsSeeder.js';

const runSeed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful.');

    await sequelize.sync();
    console.log('Database tables synchronized.');

    await seedDefaultAdmin();
    await seedDefaultProducts();

    console.log('Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
