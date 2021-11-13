'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      link.belongsTo(models.template, {
        foreignKey: "templateId",
        as: "template",
      });
      link.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      
    }
  };
  link.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    templateId: DataTypes.INTEGER,
    logo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};