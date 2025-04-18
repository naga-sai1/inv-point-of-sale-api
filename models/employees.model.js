const Employee = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define(
    "Employee",
    {
      employees_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employees_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employees_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employees_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employees_phone: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "employees",
      timestamps: false,
      engine: "InnoDB",
    }
  );
};

export default Employee;
