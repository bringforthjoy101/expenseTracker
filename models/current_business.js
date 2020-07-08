'use strict';
module.exports = (sequelize, DataTypes) => {
    var CurrentBusiness = sequelize.define('CurrentBusiness', {
        current_business_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[a-z]+$/i,
            validate: {
                len: [6, 50] // must be between 6 and 50.
            }
        }
    });


    // create association between current business and user or post
    CurrentBusiness.associate = function(models) {

        // a current business can have many users
        // a user belongs to a current business
        // this is not the final relationship between user and current business, 
        // but for simplicity lets leave it this way
        models.CurrentBusiness.hasMany(models.user);

        // a current business can have many expenses
        // an expense belongs to a current business
        models.CurrentBusiness.hasMany(models.Expense);
        models.CurrentBusiness.hasMany(models.Type);
        models.CurrentBusiness.hasMany(models.Category);
        models.CurrentBusiness.hasMany(models.Department);
        models.CurrentBusiness.hasMany(models.Role);

    };

    return CurrentBusiness;
};