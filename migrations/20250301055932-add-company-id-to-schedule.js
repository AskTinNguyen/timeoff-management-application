'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('schedule', 'company_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('schedule', ['company_id'], {
      name: 'schedule_company_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('schedule', 'schedule_company_id');
    await queryInterface.removeColumn('schedule', 'company_id');
  }
};
