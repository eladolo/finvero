'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Ordenes', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onToOne: true,
                references: {
                    model: 'Usuarios',
                    key: 'id'
                },
            },
            nombre: {
                allowNull: false,
                type: Sequelize.STRING
            },
            total: {
                allowNull: false,
                type: Sequelize.FLOAT(11),
            },
            productos: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
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
        await queryInterface.dropTable('Ordenes');
    },
};
