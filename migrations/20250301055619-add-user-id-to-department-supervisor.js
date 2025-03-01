'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DepartmentSupervisor', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('DepartmentSupervisor', ['user_id'], {
      name: 'department_supervisor_user_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('DepartmentSupervisor', 'department_supervisor_user_id');
    await queryInterface.removeColumn('DepartmentSupervisor', 'user_id');
  }
};
