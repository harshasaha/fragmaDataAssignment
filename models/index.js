'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const { mode } = require('../config/production');
const basename  = path.basename(__filename);
const db        = {};
const config = require('./../config/'+(process.env.NODE_ENV || 'default').trim());


const sequelize = new Sequelize(config.mysqlDBName, config.mysqlDBUser, config.mysqlDBPassword, {
    host: config.mysqlDBHost,
    dialect: config.mysqlDialect,
    maxConcurrentQueries: 100,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    charset: 'utf8',
    collate: 'utf8_general_ci',

    language: 'en',
    logging: false
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
