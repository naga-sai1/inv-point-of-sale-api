import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

import brandsModel from "../models/brands.model.js";
import categoryModel from "../models/categories.model.js";
import customersModel from "../models/customers.model.js";
import employeesModel from "../models/employees.model.js";
import OrderItemsModel from "../models/order_items.model.js";
import ordersModel from "../models/orders.model.js";
import paymentsModel from "../models/payment.model.js";
import productsModel from "../models/products.model.js";
import storesModel from "../models/stores.model.js";
import subCategoriesModel from "../models/sub_categories.model.js";
import suppliersModel from "../models/suppliers.model.js";
import unitsModel from "../models/units.model.js";
import usersModel from "../models/users.model.js";

const sequelizeDatabase = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

const Brand = brandsModel(sequelizeDatabase, Sequelize.DataTypes);
const Category = categoryModel(sequelizeDatabase, Sequelize.DataTypes);
const Customers = customersModel(sequelizeDatabase, Sequelize.DataTypes);
const Employees = employeesModel(sequelizeDatabase, Sequelize.DataTypes);
const OrderItems = OrderItemsModel(sequelizeDatabase, Sequelize.DataTypes);
const Orders = ordersModel(sequelizeDatabase, Sequelize.DataTypes);
const Payments = paymentsModel(sequelizeDatabase, Sequelize.DataTypes);
const Products = productsModel(sequelizeDatabase, Sequelize.DataTypes);
const Stores = storesModel(sequelizeDatabase, Sequelize.DataTypes);
const SubCategories = subCategoriesModel(sequelizeDatabase, Sequelize.DataTypes);
const Suppliers = suppliersModel(sequelizeDatabase, Sequelize.DataTypes);
const Units = unitsModel(sequelizeDatabase, Sequelize.DataTypes);
const Users = usersModel(sequelizeDatabase, Sequelize.DataTypes);

// Define associations
Products.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "category_id",
  onDelete: "CASCADE",
});

Products.belongsTo(Suppliers, {
  foreignKey: "supplier_id",
  targetKey: "suppliers_id",
  onDelete: "CASCADE",
});

Products.belongsTo(Brand, {
  foreignKey: "brand_id",
  targetKey: "brand_id",
});

Products.belongsTo(Users, {
  foreignKey: "created_by",
  targetKey: "user_id",
  as: "creator",
});

Products.belongsTo(Units, {
  foreignKey: "unit_id",
  targetKey: "unit_id",
});

Users.hasMany(Products, {
  foreignKey: "created_by",
  sourceKey: "user_id",
  as: "created_products",
});

Category.hasMany(Products, {
  foreignKey: "category_id",
  sourceKey: "category_id",
});

Suppliers.hasMany(Products, {
  foreignKey: "supplier_id",
  sourceKey: "suppliers_id",
});

Brand.hasMany(Products, {
  foreignKey: "brand_id",
  sourceKey: "brand_id",
});

Products.hasMany(OrderItems, {
  foreignKey: "product_id",
  sourceKey: "products_id",
  onDelete: "CASCADE",
});

OrderItems.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "products_id",
});

Orders.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id"
});

Users.hasMany(Orders, {
  foreignKey: "user_id",
  sourceKey: "user_id"
});

Units.hasMany(Products, {
  foreignKey: "unit_id",
  sourceKey: "unit_id",
});

SubCategories.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "category_id",
  onDelete: "CASCADE",
});

SubCategories.belongsTo(Users, {
  foreignKey: "created_by",
  targetKey: "user_id",
  as: "creator",
});

Orders.hasMany(OrderItems, {
  foreignKey: "order_id",
  sourceKey: "orders_id",
  onDelete: "CASCADE"
});

OrderItems.belongsTo(Orders, {
  foreignKey: "order_id",
  targetKey: "orders_id"
});

Orders.belongsTo(Customers, {
  foreignKey: "customer_id",
  targetKey: "customers_id"
});

Customers.hasMany(Orders, {
  foreignKey: "customer_id",
  sourceKey: "customers_id"
});

Stores.hasMany(Orders, {
  foreignKey: "store_id",
  sourceKey: "store_id", 
});

Stores.hasMany(Products, {
  foreignKey: "store_id",
  sourceKey: "store_id", 
});

Products.belongsTo(Stores, {
  foreignKey: "store_id",
  targetKey: "store_id"
});

Suppliers.hasMany(Products, {
  foreignKey: "supplier_id",
  sourceKey: "suppliers_id"
});

Suppliers.hasMany(Users, {
  foreignKey: "supplier_id",
  sourceKey: "suppliers_id"
});

Users.belongsTo(Suppliers, {
  foreignKey: "supplier_id",
  targetKey: "suppliers_id"
});

const Models = {
  Brand,
  Category,
  Customers,
  Employees,
  OrderItems,
  Orders,
  Payments,
  Products,
  Stores,
  SubCategories,
  Suppliers,
  Units,
  Users,
};

const connection = {};

export const connectToDatabase = async () => {
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

export { sequelizeDatabase, connection };
