/**
 * The User model.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
 
// put your model dependencies here...
// i.e. var moment = require('moment'); // For date handling e.t.c
// var dbLayer = require('../modules/dbLayer');

/**
 * Model Development
 */
 
module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

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
            unique: false,
            validate: {
              len: [6, 50] // must be between 6 and 50.
            }
        },
        
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false,
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
        
        // you can also write in a single line without issues
        name:{type: Sequelize.STRING, unique: false},
        module_name: {type: Sequelize.STRING},
        module_id : {type: Sequelize.INTEGER},
        account_id : {type: Sequelize.STRING},
        // permission : {type: Sequelize.STRING},
        profile : {type: Sequelize.STRING},
        // current_business : {type: Sequelize.STRING},
        RoleId : {type: Sequelize.INTEGER, defaultValue: 2, allowNull: false},
        DepartmentId : {type: Sequelize.INTEGER, allowNull: false}

    });

    User.associate = function(models) {
        models.user.hasMany(models.Expense);
        
        // models.user.hasMany(models.Expense, {
        //   foreignKey: 'ApproverId'
        // });
    
        models.user.belongsTo(models.Department, {
          onDelete: "CASCADE",
          foreignKey: {
          allowNull: true
        }
        });
    
        models.user.belongsTo(models.Role, {
          onDelete: "CASCADE",
          foreignKey: {
          allowNull: true
        }
        });
        
        models.user.belongsTo(models.CurrentBusiness, {
            allowNull: true
        });
        
        models.user.belongsTo(models.Profile, {
            allowNull: true
        });
        
        models.user.belongsToMany(models.Permission,{ 
          as: 'permissions', 
          through: 'UserPermissions',
          foreignKey: 'user_id'
        });
      };

    return User;

}

 
    