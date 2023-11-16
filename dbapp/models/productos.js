'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Productos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uid: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    precio: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cantidad: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Productos',
    tableName: 'Productos',
  });
  return Productos;
};