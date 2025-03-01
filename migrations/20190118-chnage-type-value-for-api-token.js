'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = await queryInterface.describeTable('Companies');
    
    if (attributes.integration_api_token.type === 'UUID') {
      return;
    }

    // Define the new table structure
    const tableDefinition = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      date_format: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'YYYY-MM-DD'
      },
      company_wide_message: {
        type: Sequelize.STRING,
        allowNull: true
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Europe/London'
      },
      mode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      integration_api_token: {
        type: Sequelize.UUID,
        allowNull: true
      },
      integration_api_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      carry_over: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    };

    // Disable foreign key checks
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    try {
      // Create backup table with new structure
      await queryInterface.createTable('Companies_backup', tableDefinition);

      // Copy data from old table to new table with explicit column list
      await queryInterface.sequelize.query(
        'INSERT INTO `Companies_backup` (`id`, `name`, `created_at`, `updated_at`, `date_format`, `company_wide_message`, `timezone`, `mode`, `integration_api_token`, `integration_api_enabled`, `carry_over`) SELECT `id`, `name`, `created_at`, `updated_at`, `date_format`, `company_wide_message`, `timezone`, `mode`, `integration_api_token`, `integration_api_enabled`, `carry_over` FROM `Companies`'
      );

      // Drop old table and rename backup
      await queryInterface.dropTable('Companies');
      await queryInterface.renameTable('Companies_backup', 'Companies');

      // Add index back
      await queryInterface.addIndex('Companies', ['id']);
    } finally {
      // Re-enable foreign key checks
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  },

  async down(queryInterface, Sequelize) {
    // No way back!
    return;
  }
};
