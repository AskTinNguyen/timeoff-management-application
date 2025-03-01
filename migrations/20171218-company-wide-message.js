'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('Companies');

    if (attributes.hasOwnProperty('company_wide_message')) {
      return Promise.resolve();
    }

    return queryInterface.addColumn(
      'Companies',
      'company_wide_message',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'company_wide_message');
  }
};
