'use strict';
const {hashSync, compareSync} = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING
  });

  User.beforeCreate((user, fn) => {
     return user.password = hashPassword(user.password)
  });

  User.prototype.authenticateUser = function authenticateUser(password){
    console.log(password, this.password)
    return compareSync(password, this.password)
  }

  function hashPassword(password) {
    return hashSync(password);
  }
  return User;
};

