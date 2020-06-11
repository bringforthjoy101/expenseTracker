'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    category_name:{type: DataTypes.STRING},
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Expense);
  };
  
  return Category;
};

 


// Make sure you complete other models fields