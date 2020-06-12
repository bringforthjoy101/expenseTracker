'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    role_name:{type: DataTypes.STRING},
  });
  
  Role.associate = function(models) {
    models.Role.hasMany(models.user);
  };
  
  return Role;
};
