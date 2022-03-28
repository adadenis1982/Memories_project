'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  postMessage.init(
    {
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      creator: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      selectedFile: DataTypes.TEXT,
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'postMessage',
    }
  );
  return postMessage;
};
