import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const AccountRequest = sequelize.define('AccountRequest', {
	requestId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	linkedinProfile: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	message: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	requestCount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
});

export default AccountRequest;
