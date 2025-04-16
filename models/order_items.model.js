module.exports = (sequelizeDatabase, DataTypes) => {
    const OrderItem = sequelizeDatabase.define("OrderItem", {
        order_items_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "orders_id"
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "products_id"
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
        {
            tableName: "order_items",
            timestamps: false,
            engine: "InnoDB"
        }
    );

    return OrderItem;
};


