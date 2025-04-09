// module.exports = (sequelize, DataTypes) => {
//     const Category = sequelize.define(
//         "categories",
//         {
//             category_id: {
//                 type: DataTypes.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//             },
//             category_name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             description: {
//                 type: DataTypes.TEXT,
//                 allowNull: true,
//             },
//             created_on: {
//                 type: DataTypes.DATE,
//                 defaultValue: DataTypes.NOW,
//             },
//             updated_on: {
//                 type: DataTypes.DATE,
//                 defaultValue: DataTypes.NOW,
//             },
//         },
//         {
//             tableName: "categories",
//             timestamps: false,
//         }
//     );

//     return Category;
// }