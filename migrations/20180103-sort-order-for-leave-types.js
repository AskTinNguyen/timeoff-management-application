'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('LeaveTypes');
    
    if (attributes.hasOwnProperty('sort_order')) {
      return;
    }

    return queryInterface.addColumn(
      'LeaveTypes',
      'sort_order',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('LeaveTypes', 'sort_order');
  }
};
