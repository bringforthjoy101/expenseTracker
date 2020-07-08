'use strict';
module.exports = (sequelize, DataTypes) => {
    var Profile = sequelize.define('Profile', {
        profile_name: {
            type: DataTypes.STRING,
            allowNull: false,
            is: /^[a-z]+$/i,
            validate: {
                len: [3, 50] // must be between 3 and 50.
            }
        }
    });

    // create association between user and profile
    // a profile can have many users
    Profile.associate = function(models) {
        models.Profile.hasMany(models.user);
    };

    return Profile;
};