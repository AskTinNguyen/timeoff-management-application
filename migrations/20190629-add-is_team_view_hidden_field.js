'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (attributes.hasOwnProperty('is_team_view_hidden')) {
      return;
    }

    return queryInterface.addColumn(
      'Companies',
      'is_team_view_hidden',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Companies', 'is_team_view_hidden');
  }
};
