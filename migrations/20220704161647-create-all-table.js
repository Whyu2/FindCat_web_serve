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
    kd_hewan: {
      type: Sequelize.STRING(11),
      allowNull :false,
      },
    nama: {
    type: Sequelize.STRING,
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
