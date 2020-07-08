'use strict';
module.exports = (sequelize, DataTypes) => {
    var Permission = sequelize.define('Permission', {
        permission_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[a-z]+$/i,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        }
    });

    // create association between permission and user
    // a permission can have many users
    // a user can have many permissions
    Permission.associate = function(models) {
        models.Permission.belongsToMany(models.user, {
            as: 'users',
            through: 'UserPermissions',
            foreignKey: 'permission_id'
        });
    };

    return Permission;
};