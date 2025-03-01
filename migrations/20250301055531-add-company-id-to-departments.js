'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Departments', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Departments', ['companyId'], {
      name: 'departments_company_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Departments', 'departments_company_id');
    await queryInterface.removeColumn('Departments', 'companyId');
  }
};
