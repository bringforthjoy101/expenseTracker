'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    type_name:{type: DataTypes.STRING},
  });

  Type.associate = function(models) {
    models.Type.hasMany(models.Expense);
  };
  
  return Type;
};

// Make sure you complete other models fields