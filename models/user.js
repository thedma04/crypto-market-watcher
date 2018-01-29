import { hashSync, compareSync } from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  User.beforeCreate(user => user.password = hashPassword(user.password));

  User.prototype.comparePassword = function comparePassword(password) {
    return compareSync(password, this.password);
  };

  function hashPassword(password) {
    return hashSync(password);
  }
  return User;
};

