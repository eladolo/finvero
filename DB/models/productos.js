'use strict';
const { Model } = require('sequelize');
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
    Productos.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            uid: {
                allowNull: false,
                type: DataTypes.INTEGER,
                oneToOne: true,
                references: {
                    model: Usuarios,
                    key: 'id'
                },
            },
            nombre: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            precio: {
                allowNull: false,
                type: DataTypes.FLOAT(11),
            },
            cantidad: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
            modelName: 'Productos',
            tableName: 'Productos',
            timestamps: true,
            createdAt: true,
            updatedAt: true
        },
    );
    return Productos;
};
