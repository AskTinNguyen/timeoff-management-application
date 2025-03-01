'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Leaves', 'approverId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addIndex('Leaves', ['approverId'], {
      name: 'leaves_approver_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Leaves', 'leaves_approver_id');
    await queryInterface.removeColumn('Leaves', 'approverId');
  }
};
