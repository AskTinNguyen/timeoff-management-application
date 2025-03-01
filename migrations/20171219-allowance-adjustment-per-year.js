'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_allowance_adjustment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      adjustment: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    const attributes = await queryInterface.describeTable('Users');

    if (attributes.hasOwnProperty('adjustment')) {
      const sql = `
        INSERT INTO user_allowance_adjustment (year, adjustment, user_id, created_at, updated_at)
        SELECT 2017 AS year, adjustment, id as user_id, NOW() as created_at, NOW() as updated_at
        FROM Users
      `;
      await queryInterface.sequelize.query(sql);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_allowance_adjustment');
  }
};
