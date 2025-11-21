import Product from '../models/product.js';

export const getAllProducts = async (req, res) => {
	const products = await Product.findAll();
	res.json(products);
};

export const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const updateProduct = async (req, res) => {
	const product = await Product.findByPk(req.params.productId);
	if (!product)
		return res.status(404).json({ message: 'Product not found.' });

	const body = req.body || {};
	const updateData = {
		...body,
		offerAmount: body.offerAmount ?? null,
		offerPrice: body.offerPrice ?? null,
	};
	await product.update(updateData);

	res.json(product);
};

export const deleteProduct = async (req, res) => {
	const product = await Product.findByPk(req.params.productId);
	if (!product)
		return res.status(404).json({ message: 'Product not found.' });
	await product.destroy();
	res.json({ message: 'Product deleted successfully' });
};
