'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  async up({context :queryInterface}) {
    await queryInterface.createTable('UsersAuth', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.INTEGER
      },
      refreshtoken: {
        type: Sequelize.STRING
      },
      ekey: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down({context :queryInterface}) {
    await queryInterface.dropTable('UsersAuth');
  }
};