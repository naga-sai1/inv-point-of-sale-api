module.exports = (sequelizeDatabase, DataTypes) => {
    const stores = sequelizeDatabase.define(
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
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: "stores",
            timestamps: true,
            engine: "InnoDB",
        }
    );
    return stores;
};
