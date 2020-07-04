'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    category_name:{type: DataTypes.STRING},
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Expense);
    
    models.Category.belongsTo(models.CurrentBusiness, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Category;
};

 


// Make sure you complete other models fields