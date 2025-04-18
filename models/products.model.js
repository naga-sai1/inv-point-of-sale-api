const products = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define(
    "products",
    {
      products_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      products_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      products_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      products_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "category",
          key: "category_id",
        },
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "suppliers",
          key: "suppliers_id",
        },
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "units",
          key: "unit_id",
        },
      },
      batch_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      manufacturing_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      qty_alert: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "discontinued"),
        defaultValue: "active",
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "brands",
          key: "brand_id",
        },
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      gst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      shedule: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "stores",
          key: "store_id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "products",
      engine: "InnoDB",
    }
  );
};

export default products;
