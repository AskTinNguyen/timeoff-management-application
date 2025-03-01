'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Leaves', 'leaveTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'LeaveTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Leaves', ['leaveTypeId'], {
      name: 'leaves_leave_type_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Leaves', 'leaves_leave_type_id');
    await queryInterface.removeColumn('Leaves', 'leaveTypeId');
  }
};
