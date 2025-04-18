const Brand = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define(
    "brands",
    {
      brand_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
        Comment: "Base64 encoded brand logo image",
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        Comment: "ID of the store associated with the brand",
        references: {
          model: "stores",
          key: "store_id",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        Comment: "true = active, false = inactive",
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        Comment: "true = active, false = inactive",
      },
    },
    {
      tableName: "brands",
      timestamps: false,
      engine: "InnoDB",
    }
  );
};

export default Brand;
