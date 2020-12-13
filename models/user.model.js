const CryptoJS = require("crypto-js");
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
var config = require('./../config/'+(process.env.NODE_ENV || 'default').trim());
const { TE } =  require('../services/util.service');

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0
      },
    }, {
      tableName: 'user'
    });
  
    user.prototype.getJWT = async function () {
      var data = { email: this.email };
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), config.crypt_key).toString();
      return jwt.sign({ token: ciphertext }, config.jwt_sec, { expiresIn: config.jwt_exp });
  
    };
  
    user.prototype.comparePassword = async function (pw) {
      
      if (!this.password) TE('password not set');
  
      if (sha1(pw) == this.password) {
  
        return this;
      }
      else {
  
        TE('Invalid Credentials. Please try again.');
      }
    }
  
    return user;
};