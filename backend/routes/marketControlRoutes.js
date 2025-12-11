import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/allProducts', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;
