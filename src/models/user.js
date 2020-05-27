'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    firstName: {
     type: DataTypes.STRING,
     allowNull: true,
    },
    lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Email'
        },
        notEmpty: {
          args: true,
          msg: 'Email is not allowed to be empty'
        }
      }
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your Username'
        },
        notEmpty: {
          args: true,
          msg: 'Username is not allowed to be empty'
        }
      }
    },
    password: {
    type: DataTypes.STRING,
    allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'requester'
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING
    },
    dob: {
      allowNull: true,
      type: DataTypes.DATE
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};