'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('schedule', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('schedule', ['user_id'], {
      name: 'schedule_user_id'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('schedule', 'schedule_user_id');
    await queryInterface.removeColumn('schedule', 'user_id');
  }
};
