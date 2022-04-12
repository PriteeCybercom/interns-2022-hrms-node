'use strict';
const { Sequelize } = require('sequelize');
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('educationmasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },title:{
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        type: Sequelize.DATE
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
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('educationmasters');
  }
};