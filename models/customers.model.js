module.exports = (sequelizeDatabase, DataTypes) => {
  const Customer = sequelizeDatabase.define(
    "Customer",
    {
      customers_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customers_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customers_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customers_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      doctor_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
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
      tableName: "customers",
      timestamps: false,
      engine: "InnoDB",
    }
  );

  return Customer;
};
