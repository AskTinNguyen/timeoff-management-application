'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('user_allowance_adjustment');

    if (attributes.hasOwnProperty('carried_over_allowance')) {
      return;
    }

    return queryInterface.addColumn(
      'user_allowance_adjustment',
      'carried_over_allowance',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_allowance_adjustment', 'carried_over_allowance');
  }
};
