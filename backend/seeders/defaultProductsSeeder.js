import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/product.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveImage = (filename) => {
	const absolute = path.join(__dirname, 'images', filename);
	if (!fs.existsSync(absolute)) {
		throw new Error(`Image not found: ${absolute}`);
	}
	return fs.readFileSync(absolute);
};

const DEFAULT_PRODUCTS = [
	{
		name: 'Paprika Rot',
		unitPrice: 1.00,
		offerAmount: 3,
		offerPrice: 2.50,
		image: 'paprika.avif',
	},
	{
		name: 'Rinder Rumpsteak',
		unitPrice: 8.00,
		image: 'meat.avif',
	},
	{
		name: 'M&M Peanut',
		unitPrice: 2.50,
		offerAmount: 2,
		offerPrice: 4.00,
		image: 'mym.webp',
	},
	{
		name: 'Sour Cream Ja',
		unitPrice: 0.70,
		image: 'shopping.webp',
	},
	{
		name: 'Pulled Pork',
		unitPrice: 7.49,
		image: 'pulledpork.avif',
	},
];

export const seedDefaultProducts = async () => {
	const productCount = await Product.count();

	if (productCount > 0) {
		return;
	}

	for (const product of DEFAULT_PRODUCTS) {
		const imageBuffer = resolveImage(product.image);

		await Product.create({
			name: product.name,
			unitPrice: product.unitPrice,
			offerAmount: product.offerAmount ?? null,
			offerPrice: product.offerPrice ?? null,
			image: imageBuffer,
		});

		console.log(`Product seeded: ${product.name}`);
	}

	console.log('All default products have been seeded.');
};
