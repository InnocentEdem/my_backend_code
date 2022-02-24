'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      // define association here
      this.belongsTo(user,{foreignKey:"userId"})
    }
    toJSON(){
      return {...this.get(),id:undefined,userId:undefined}
    }
  }
  post.init({
    body:{
      type:DataTypes.STRING,
      allowNull:false
    },
    uuid: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    post_date:{
      type: DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'post',
  });
  return post;
};