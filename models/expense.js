'use strict';
module.exports = (sequelize, DataTypes) => {
    var Expense = sequelize.define('Expense', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[A-Za-z\s]+$/,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },

        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [3, 200] // must be between 3 and 200.
            }
        },

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Approved', 'Declined'),
            defaultValue: 'Pending'
        },
        DepartmentId: {
            type: DataTypes.INTEGER
        },
        TypeId: {
            type: DataTypes.INTEGER
        },
        CategoryId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        ReviewerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reviewer: {
            type: DataTypes.STRING,
            allowNull: true,
            is: /^[A-Za-z\s]+$/,
            validate: {
                len: [3, 200] // must be between 3 and 200.
            }
        },
    });



    Expense.associate = function(models) {

        models.Expense.belongsTo(models.user, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });

        models.Expense.belongsTo(models.Category, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });

        models.Expense.belongsTo(models.Type, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });

        models.Expense.belongsTo(models.Department, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            }
        });

        models.Expense.belongsTo(models.CurrentBusiness, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Expense;
};