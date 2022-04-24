'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technologymaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  technologymaster.init({
    deletedDate: DataTypes.DATE,
    isActive:DataTypes.TINYINT,
    title:DataTypes.STRING,
    parentId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'technologymaster',
  });
  return technologymaster;
};