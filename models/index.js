'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});






db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./User.js')(sequelize, DataTypes);
db.Post = require('./Post.js')(sequelize, DataTypes);

db.Users .hasMany(db.Post, {
  foreignKey: 'user_id',
  as: 'post'
});

db.Post.belongsTo(db.Users, {
  foreignKey: 'user_id',
  as: 'user'
})
module.exports = db;
