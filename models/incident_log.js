'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class incident_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  incident_log.init({
    type: DataTypes.STRING,
    time_stamp: DataTypes.DATE,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'incident_log',
  });
  return incident_log;
};