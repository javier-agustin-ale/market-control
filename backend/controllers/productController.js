import multer from 'multer';
import Product from '../models/product.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const getAllProducts = async (req, res) => {
	const products = await Product.findAll();
	res.json(products);
};

export const createProduct = [
	upload.single('image'),
	async (req, res) => {
		try {
			const productData = {
				...req.body,
				image: req.file.buffer,
			};
			const product = await Product.create(productData);
			res.status(201).json(product);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},
];

export const updateProduct = [
	upload.single('image'),
	async (req, res) => {
		const product = await Product.findByPk(req.params.productId);
		if (!product)
			return res.status(404).json({ message: 'Product not found.' });

		const body = req.body || {};
		const updateData = {
			...body,
			offerAmount: body.offerAmount ?? null,
			offerPrice: body.offerPrice ?? null,
		};
		if (req.file) {
			updateData.image = req.file.buffer;
		}
		await product.update(updateData);

		res.json(product);
	},
];

export const deleteProduct = async (req, res) => {
	const product = await Product.findByPk(req.params.productId);
	if (!product)
		return res.status(404).json({ message: 'Product not found.' });
	await product.destroy();
	res.json({ message: 'Product deleted successfully' });
};
