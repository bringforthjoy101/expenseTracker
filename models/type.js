'use strict';
module.exports = (sequelize, DataTypes) => {
    var Type = sequelize.define('Type', {
        type_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[A-Za-z\s]+$/,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },
    });

    Type.associate = function(models) {
        models.Type.hasMany(models.Expense);

        models.Type.belongsTo(models.CurrentBusiness, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Type;
};

// Make sure you complete other models fields