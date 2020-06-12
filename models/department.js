'use strict';
module.exports = (sequelize, DataTypes) => {
  var Department = sequelize.define('Department', {
    dept_name:{type: DataTypes.STRING},
  });

  Department.associate = function(models) {
    models.Department.hasMany(models.user);

    models.Department.hasMany(models.Expense);
  };

  return Department;
};
