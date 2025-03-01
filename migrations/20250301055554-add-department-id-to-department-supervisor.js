'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DepartmentSupervisor', 'department_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('DepartmentSupervisor', ['department_id'], {
      name: 'department_supervisor_department_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('DepartmentSupervisor', 'department_supervisor_department_id');
    await queryInterface.removeColumn('DepartmentSupervisor', 'department_id');
  }
};
