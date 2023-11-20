'use strict';
const { Model } = require('sequelize');
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
                primaryKey: true,
                autoIncrement: true,
                oneToMany: true,
            },
            email: {
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            nombre: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            role: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Usuarios',
            tableName: 'Usuarios',
            timestamps: true,
            createdAt: true,
            updatedAt: true
        },
    );
    return Usuarios;
};
