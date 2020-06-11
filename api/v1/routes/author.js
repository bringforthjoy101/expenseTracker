/**
 * Database author model.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
 
var moment = require('moment'); // For date handling.

/**
 * Model Development
 */

module.exports = function(sequelize, Sequelize) {

    var Author = sequelize.define('author', {
        
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
    
            firstname: {
                type: Sequelize.STRING,
                notEmpty: true
            },
    
            lastname: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            
            date_of_birth: { 
                type: Sequelize.DATE,
                notEmpty: true
            },
            
            date_of_death: { 
                type: Sequelize.DATE,
                notEmpty: false
            },
            
            bio: { 
                type: Sequelize.TEXT,
                defaultValue: "This author is yet to update their bio",
                notEmpty: false
            }
            
        },
        
        // Virtuals - fields that do not exist in DB but created based on two/multiple fields combination
        // See example below - To create a field called fullName, a virtual field that does not exist in db
        // to learn more - https://sequelize.org/master/manual/getters-setters-virtuals.html#combining-getters-and-setters
        {
          getterMethods: {
            fullName() {
            var fullname = '';
              if (this.firstname && this.lastname) {
                fullname = this.lastname + ', ' + this.firstname;
              }
            
              if (!this.firstname && !this.lastname) {
                fullname = '';
              }
              return fullname;
            },
            lifetime_string() {
                  var lifetime_string = '';
                  if (this.date_of_birth) {
                    lifetime_string = moment(this.date_of_birth).format('MMMM Do, YYYY');
                  }
                  lifetime_string += ' - ';
                  if (this.date_of_death) {
                    lifetime_string += moment(this.date_of_death).format('MMMM Do, YYYY');
                  }
                  return lifetime_string;
            }
          },
          setterMethods: {
            fullName(value) {
              // Note: this is just for demonstration.
              // See: https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/
              const names = value.split(' ');
              const firstname = names[0];
              const lastname = names.slice(1).join(' ');
              this.setDataValue('firstName', firstname);
              this.setDataValue('lastName', lastname);
            }
          }
        }
        //   In your controller, you can use this to create
        //   let author = await Author.create({ firstName: 'John',  lastName: 'Doe' });
        //   console.log(author.fullName); // gives you => 'John Doe'
        //   change fullName to something else...
        //   author.fullName = 'Someone Else';
        //   await author.save();
        //   author = await Author.findOne();
        //   console.log(author.firstName); // 'Someone'
        //   console.log(author.lastName); // 'Else'
        //   get it?
);
    
    
  // create association between author and post
  // an author can have many posts
 
 // create association between author and post
  // an author can have many posts
  Author.associate = function(models) {
    models.author.hasMany(models.book);
  };
  
  
    return Author;

}
 