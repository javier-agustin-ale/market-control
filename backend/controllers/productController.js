import Product from '../models/product.js';

export const getAllProducts = async (req, res) => {
	const products = await Product.findAll();
	res.json(products);
};
