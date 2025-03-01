'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Leaves', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('Leaves', ['userId'], {
      name: 'leaves_user_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Leaves', 'leaves_user_id');
    await queryInterface.removeColumn('Leaves', 'userId');
  }
};
