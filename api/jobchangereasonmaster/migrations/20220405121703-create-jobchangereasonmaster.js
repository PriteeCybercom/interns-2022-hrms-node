'use strict';
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('jobchangereasonmasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title:{
        allowNull:true,
        default:null,
        type:Sequelize.STRING
      },
      isActive:{
        allowNull:false,
        type:Sequelize.TINYINT
      },
      deletedDate: {
        type: Sequelize.DATE,
        allowNull:true,
        default:null
      },
      createdAt:{
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
    await queryInterface.dropTable('jobchangereasonmasters');
  }
};