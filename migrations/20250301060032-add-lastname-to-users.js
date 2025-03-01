'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'lastname', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });

    await queryInterface.addIndex('Users', ['lastname'], {
      name: 'users_lastname'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users', 'users_lastname');
    await queryInterface.removeColumn('Users', 'lastname');
  }
};
