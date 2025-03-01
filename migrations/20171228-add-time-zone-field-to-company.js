'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (attributes.hasOwnProperty('timezone')) {
      return;
    }

    return queryInterface.addColumn(
      'Companies',
      'timezone',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Europe/London'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Companies', 'timezone');
  }
};
