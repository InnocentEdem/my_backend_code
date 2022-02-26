'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class used_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  used_token.init({
    token: DataTypes.STRING,
    new_token:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'used_token',
  });
  return used_token;
};