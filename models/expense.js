'use strict';
module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    title:{type: DataTypes.STRING},
    desc:{type: DataTypes.TEXT},
    amount:{type: DataTypes.INTEGER},
    status:{type: DataTypes.ENUM('Pending', 'Approved', 'Declined'), defaultValue: 'Pending'},
    business_name:{type: DataTypes.STRING},
    DepartmentId: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    EmployeeId: DataTypes.INTEGER
    
  });
  

      
  Expense.associate = function (models) { 
    
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
  };

  return Expense;
};

// Make sure you complete other models fields