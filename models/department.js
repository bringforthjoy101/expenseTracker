'use strict';
module.exports = (sequelize, DataTypes) => {
    var Department = sequelize.define('Department', {
        dept_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[A-Za-z\s]+$/, 
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },
    });

    Department.associate = function(models) {
        models.Department.hasMany(models.user);

        models.Department.hasMany(models.Expense);

        models.Department.belongsTo(models.CurrentBusiness, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Department;
};