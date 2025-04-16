module.exports = (sequelizeDatabase, DataTypes) => {
    const Order = sequelizeDatabase.define("Order", {
        orders_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "customers",
                key: "customer_id"
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_method: {
            type: DataTypes.ENUM('Cash', 'Online', 'Card'),
            defaultValue: 'Cash'
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Processing', 'Cancelled', 'Completed'),
            defaultValue: 'Completed'
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "stores",
                key: "store_id"
            }
        }
    },
        {
            tableName: "orders",
            timestamps: false,
            engine: "InnoDB"
        }
    );

    return Order;
};


