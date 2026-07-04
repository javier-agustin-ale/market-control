import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public — anyone can view products
router.get('/allProducts', productController.getAllProducts);

// Protected — requires a valid JWT with role 'admin'
router.post('/', authenticate, requireAdmin, ...productController.createProduct);
router.put('/:productId', authenticate, requireAdmin, ...productController.updateProduct);
router.delete('/:productId', authenticate, requireAdmin, productController.deleteProduct);

export default router;
