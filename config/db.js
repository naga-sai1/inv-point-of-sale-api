import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const brandsModel = require("../models/brands.model");
const categoryModel = require("../models/category.model");
const customersModel = require("../models/customers.model");
const employeesModel = require("../models/employees.model");
const OrderItemsModel = require("../models/order_items.model");
const ordersModel = require("../models/orders.model");
const paymentsModel = require("../models/payments.model");
const productsModel = require("../models/products.model");
const storesModel = require("../models/stores.model");
const subCategoriesModel = require("../models/sub_categories.model");
const suppliersModel = require("../models/suppliers.model");
const unitsModel = require("../models/units.model");
const usersModel = require("../models/users.model");

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
  sourceKey: "stores_id"
});

Stores.hasMany(Products, {
  foreignKey: "store_id",
  sourceKey: "stores_id"
});

Products.belongsTo(Stores, {
  foreignKey: "store_id",
  targetKey: "stores_id"
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
