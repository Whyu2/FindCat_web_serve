'use strict';



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

  await queryInterface.createTable('posts', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull:false,
      references: {
          model: 'users',
          key: 'id'
      },onDelete: "CASCADE"
    },
    judul_postingan: {
    type: Sequelize.STRING,
    allowNull :false,
    },
    jenis: {
      type: Sequelize.STRING,
      allowNull :false,
    },
    postingan: {
      type: Sequelize.TEXT,
    },
    foto: {
      type: Sequelize.STRING,
      allowNull :false,
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
      await queryInterface.dropAllTables();
  }
};
