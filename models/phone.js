'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Phone.belongsTo(models.User,{foreignKey:'AuthorId'})
    }
  }
  Phone.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{args: true, msg:"Name is require"},
        notEmpty:{msg: "Name is require"}
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{args: true, msg:"Stock is require"},
        notEmpty:{msg: "Stock is require"}
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{args: true, msg:"Type is require"},
        notEmpty:{msg: "Type is require"}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{args: true, msg:"Description is require"},
        notEmpty:{msg: "Description is require"}
      }
    },
    AuthorId:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};