'use strict';
const { Model, INTEGER } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Usuarios.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },
            email: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            nombre: DataTypes.STRING,
            password: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            role: {
                allowNull: true,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Usuarios',
            tableName: 'Usuarios',
        },
    );
    return Usuarios;
};
