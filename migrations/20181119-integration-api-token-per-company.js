'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (!attributes.hasOwnProperty('integration_api_token')) {
      await queryInterface.addColumn(
        'Companies',
        'integration_api_token',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      );
    }

    if (!attributes.hasOwnProperty('integration_api_enabled')) {
      await queryInterface.addColumn(
        'Companies',
        'integration_api_enabled',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Companies', 'integration_api_token');
    await queryInterface.removeColumn('Companies', 'integration_api_enabled');
  }
};
