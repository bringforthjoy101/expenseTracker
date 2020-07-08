'use strict';
module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[a-z]+$/i,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },
    });

    Category.associate = function(models) {
        models.Category.hasMany(models.Expense);

        models.Category.belongsTo(models.CurrentBusiness, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Category;
};