'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (attributes.hasOwnProperty('mode')) {
      return;
    }

    return queryInterface.addColumn(
      'Companies',
      'mode',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Companies', 'mode');
  }
};
