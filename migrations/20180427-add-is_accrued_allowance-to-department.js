'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Departments');
    
    if (attributes.hasOwnProperty('is_accrued_allowance')) {
      return;
    }

    return queryInterface.addColumn(
      'Departments',
      'is_accrued_allowance',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Departments', 'is_accrued_allowance');
  }
};
