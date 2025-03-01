'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('Departments');

    if (attributes.hasOwnProperty('allowance')) {
      return Promise.resolve();
    }

    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      console.log('Going into SQLite case');

      const departmentAttributes = {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        include_public_holidays: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        allowance: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        company_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Companies',
            key: 'id'
          }
        },
        boss_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false
        }
      };

      await queryInterface.sequelize.query('PRAGMA foreign_keys=off;');
      await queryInterface.createTable('Departments_backup', departmentAttributes);
      await queryInterface.sequelize.query(
        'INSERT INTO `Departments_backup` (id, name, include_public_holidays, created_at, updated_at, company_id, boss_id, allowance) SELECT id, name, include_public_holidays, created_at, updated_at, company_id, boss_id, allowence FROM `Departments`'
      );
      await queryInterface.dropTable('Departments');
      await queryInterface.renameTable('Departments_backup', 'Departments');
      await queryInterface.sequelize.query('PRAGMA foreign_keys=on;');
      await queryInterface.addIndex('Departments', ['company_id']);
      await queryInterface.addIndex('Departments', ['id']);
    } else {
      console.log('Generic option');
      await queryInterface.renameColumn('Departments', 'allowence', 'allowance');
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Departments', 'allowance', 'allowence');
  }
};
