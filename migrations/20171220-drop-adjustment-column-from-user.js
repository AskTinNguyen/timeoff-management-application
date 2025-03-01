'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('Users');

    if (!attributes.hasOwnProperty('adjustment')) {
      return;
    }

    if (queryInterface.sequelize.getDialect() !== 'sqlite') {
      // For non SQLite: it is easy
      return queryInterface.removeColumn('Users', 'adjustment');
    }

    // For SQLite it is "fun"
    const userAttributes = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Departments',
          key: 'id'
        }
      },
      auto_approve: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    };

    await queryInterface.sequelize.query('PRAGMA foreign_keys=off;');
    await queryInterface.createTable('Users_backup', userAttributes);
    await queryInterface.sequelize.query(`
      INSERT INTO Users_backup (
        id, email, password, name, lastname, activated, admin,
        start_date, end_date, created_at, updated_at,
        company_id, department_id, auto_approve
      )
      SELECT
        id, email, password, name, lastname, activated, admin,
        start_date, end_date, created_at, updated_at,
        company_id, department_id, auto_approve
      FROM Users
    `);
    await queryInterface.dropTable('Users');
    await queryInterface.renameTable('Users_backup', 'Users');
    await queryInterface.sequelize.query('PRAGMA foreign_keys=on;');
    await queryInterface.addIndex('Users', ['company_id']);
  },

  down: async (queryInterface, Sequelize) => {
    // No way back!
    return;
  }
};
