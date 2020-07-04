'use strict';
module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
     permission_name: {
        type: DataTypes.STRING,
        allowNull: false,
        }
  });
 
  // create association between permission and user
  // a permission can have many users
  // a user can have many permissions
   Permission.associate = function(models) {
     models.Permission.belongsToMany(models.user,{ 
       as: 'users', 
       through: 'UserPermissions',
       foreignKey: 'permission_id'
     });
   };
  
  return Permission;
};
 