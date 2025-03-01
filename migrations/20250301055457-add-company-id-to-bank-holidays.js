'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BankHolidays', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('BankHolidays', ['companyId'], {
      name: 'bank_holidays_company_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('BankHolidays', 'bank_holidays_company_id');
    await queryInterface.removeColumn('BankHolidays', 'companyId');
  }
};
