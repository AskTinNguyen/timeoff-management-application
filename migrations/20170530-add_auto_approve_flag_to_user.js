'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('Users');

    if (attributes.hasOwnProperty('auto_approve')) {
      return Promise.resolve();
    }

    return queryInterface.addColumn(
      'Users',
      'auto_approve',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'auto_approve');
  }
};
