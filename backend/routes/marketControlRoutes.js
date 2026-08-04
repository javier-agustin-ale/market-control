import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import * as productController from "../controllers/productController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — anyone can view products and categories
router.get("/allProducts", productController.getAllProducts);
router.get("/categories", categoryController.getAllCategories);

// Protected — requires a valid JWT with role 'admin'
router.post(
  "/",
  authenticate,
  requireAdmin,
  ...productController.createProduct,
);
router.put(
  "/:productId",
  authenticate,
  requireAdmin,
  ...productController.updateProduct,
);
router.delete(
  "/:productId",
  authenticate,
  requireAdmin,
  productController.deleteProduct,
);
router.post(
  "/categories",
  authenticate,
  requireAdmin,
  categoryController.createCategory,
);

export default router;
