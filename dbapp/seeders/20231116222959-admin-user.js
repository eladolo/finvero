'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [{
      nombre: 'admin',
      email: 'admin@example.com',
      password: 'admin',
      role: '100',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
