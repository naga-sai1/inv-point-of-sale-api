module.exports = (sequelizeDatabase, DataTypes) => {
  const Unit = sequelizeDatabase.define(
    "Unit",
    {
      unit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_of_products: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: "units",
      timestamps: false,
      engine: "InnoDB",
    }
  );

  return Unit;
};
