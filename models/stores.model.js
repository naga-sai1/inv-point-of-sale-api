const stores = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define(
    "stores",
    {
      store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "stores",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      engine: "InnoDB",
    }
  );
};

export default stores;
