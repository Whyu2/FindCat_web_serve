'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('posts', { 
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
    id_hewan: {
      type: Sequelize.STRING(11),
      allowNull :false,
    },
    daerah: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    lokasimap: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    tgl_hilang: {
      type: Sequelize.DATE,
      allowNull :false,
    },
    jenis: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    kelamin: {
      type: Sequelize.STRING(11),
      allowNull :false,
    },
    informasi: {
      type: Sequelize.TEXT,
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
      await queryInterface.dropTable('posts');
  }
};
