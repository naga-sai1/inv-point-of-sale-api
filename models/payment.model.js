const Payment = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define(
    "Payment",
    {
      payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "orders_id", 
        },
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "payment",
      timestamps: false,
      engine: "InnoDB",
    }
  );
};

export default Payment;
