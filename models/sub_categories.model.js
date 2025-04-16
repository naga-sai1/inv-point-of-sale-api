module.exports = (sequelizeDatabase, DataTypes) => {
    const SubCategory = sequelizeDatabase.define(
      "sub_category",
      {
        sub_category_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sub_category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        created_on: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updated_on: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        status: {
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
        timestamps: false,
        tableName: "sub_categories",
        engine: "InnoDB",
      }
    );
  
    return SubCategory;
  };
  