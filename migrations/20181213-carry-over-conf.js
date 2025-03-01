'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (attributes.hasOwnProperty('carry_over')) {
      return;
    }

    return queryInterface.addColumn(
      'Companies',
      'carry_over',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Companies', 'carry_over');
  }
};
