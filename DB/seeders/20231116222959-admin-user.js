'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash('admin', salt);
        return queryInterface.bulkInsert('Usuarios', [
            {
                nombre: 'admin',
                email: 'admin@example.com',
                password: hash,
                role: '100',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Usuarios', null, {});
    },
};
