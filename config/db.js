import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const brandsModel = require("../models/brands.model");

const sequelizeDatabase = new Sequelize(
  "inv_point_of_sale",
  "root",
  "123@Apple",
  {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

const Brand = brandsModel(sequelizeDatabase, Sequelize.DataTypes);

// Define associations
Brand.associate = (models) => {};

const Models = {
  Brand,
};

const connection = {};

const connectToDatabase = async () => {
  try {
    if (!connection.isConnected) {
      await sequelizeDatabase.authenticate();
      await sequelizeDatabase.sync({ force: false });
      connection.isConnected = true;
      console.log("Database connected successfully");
      return { ...Models, sequelizeDatabase };
    } else {
      console.log("Database is already connected");
      return { ...Models, sequelizeDatabase };
    }
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = {
  connectToDatabase,
  sequelizeDatabase,
  connection,
};
