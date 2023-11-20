'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Productos', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                oneToOne: true,
                references: {
                    model: 'Usuarios',
                    key: 'id'
                },
            },
            nombre: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            precio: {
                allowNull: false,
                type: Sequelize.FLOAT(11),
            },
            cantidad: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Productos');
    },
};
