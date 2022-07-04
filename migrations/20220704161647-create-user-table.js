'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('users', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    nama: {
    type: Sequelize.STRING,
    allowNull :false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    refresh_token: {
      type: Sequelize.TEXT,
      allowNull :true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull :false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull :false,
    }
    
  });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('users');
  }
};
