'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ordenes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Ordenes.init(
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
                onToOne: true,
                references: {
                    model: Usuarios,
                    key: 'id'
                },
            },
            nombre: {
                allowNull: false,
                type: DataTypes.STRING
            },
            total: {
                allowNull: false,
                type: DataTypes.FLOAT(11),
            },
            productos: {
                allowNull: false,
                type: DataTypes.TEXT('long'),
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
            modelName: 'Ordenes',
            tableName: 'Ordenes',
            timestamps: true,
            createdAt: true,
            updatedAt: true
        },
    );
    return Ordenes;
};
