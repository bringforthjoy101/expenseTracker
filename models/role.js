'use strict';
module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[A-Za-z\s]+$/,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        },
    });

    Role.associate = function(models) {
        models.Role.hasMany(models.user);

        models.Role.belongsTo(models.CurrentBusiness, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Role;
};