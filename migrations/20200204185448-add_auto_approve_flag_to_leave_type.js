'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('LeaveTypes');
    
    if (attributes.hasOwnProperty('auto_approve')) {
      return;
    }

    return queryInterface.addColumn(
      'LeaveTypes',
      'auto_approve',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('LeaveTypes', 'auto_approve');
  }
};
