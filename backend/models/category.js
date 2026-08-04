import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Category = sequelize.define("Category", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Category;
