'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Users', ['companyId'], {
      name: 'users_company_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users', 'users_company_id');
    await queryInterface.removeColumn('Users', 'companyId');
  }
};
