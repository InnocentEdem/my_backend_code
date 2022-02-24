'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({post}) {
      // define association here
      this.hasMany(post,{foreignKey:"userId"})
    }
    toJSON(){
      return {...this.get(),id:undefined}
    }
  }
  user.init({
    uuid: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    firstname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lastname: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};