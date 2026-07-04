import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const User = sequelize.define('User', {
	userId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.ENUM('client', 'admin'),
		allowNull: false,
		defaultValue: 'client',
	},
});

export default User;
