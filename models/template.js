'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        template.belongsTo(models.user, {
            foreignKey: "userId",
            as: "user",
          });
    
          template.hasMany(models.link, {
            foreignKey: "templateId",
            as: "links",
          });
     
    }
  };
  template.init({
    titleTemplate: DataTypes.STRING,
    description: DataTypes.TEXT,
    uniqueLink: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'template',
  });
  return template;
};