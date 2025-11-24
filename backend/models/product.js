import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Product = sequelize.define('Product', {
	productId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	unitPrice: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	offerAmount: {
		type: DataTypes.INTEGER,
	},
	offerPrice: {
		type: DataTypes.DECIMAL(10, 2),
	},
	image: {
		type: DataTypes.BLOB('long'),
		allowNull: false,
	},
});

export default Product;
