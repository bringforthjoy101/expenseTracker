'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Employee = sequelize.define('Employee', {
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     DepartmentId: DataTypes.INTEGER,
//     RoleId: DataTypes.INTEGER,
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isEmail: true,
//     }},
//   });
  

 
module.exports = function(sequelize, Sequelize) {

    var Employee = sequelize.define('Employee', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            allowNull: true
        },

        lastname: {
            type: Sequelize.STRING,
            allowNull: true
        },

        

        username: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
            validate: {
              len: [3, 50] // must be between 3 and 50.
            }
        },
        
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        
        current_business: {
            type: Sequelize.STRING,
        },

        name:{type: Sequelize.STRING, unique: false},
        module_name: {type: Sequelize.STRING},
        module_id : {type: Sequelize.INTEGER},
        account_id : {type: Sequelize.STRING},
        permission : {type: Sequelize.STRING},
        
        RoleId : {type: Sequelize.INTEGER, defaultValue: 2, allowNull: false},
        DepartmentId : {type: Sequelize.INTEGER, allowNull: false}

    });
    
   // create association between employee and expense
  // an employee can have many expense
  Employee.associate = function(models) {
    models.Employee.hasMany(models.Expense);

    models.Employee.belongsTo(models.Department, {
      onDelete: "CASCADE",
      foreignKey: {
      allowNull: true
    }
    });

    models.Employee.belongsTo(models.Role, {
      onDelete: "CASCADE",
      foreignKey: {
      allowNull: true
    }
    });
  };
  
  

  return Employee;
};
 