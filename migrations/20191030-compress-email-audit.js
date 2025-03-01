'use strict';

const htmlToText = require('html-to-text');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all records from EmailAudit table
    const records = await queryInterface.sequelize.query(
      'SELECT id, body FROM EmailAudit',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Process records in batches to avoid memory issues
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      
      // Update each record in the batch
      for (const record of batch) {
        await queryInterface.sequelize.query(
          'UPDATE EmailAudit SET body = ? WHERE id = ?',
          {
            replacements: [htmlToText.fromString(record.body), record.id],
            type: Sequelize.QueryTypes.UPDATE
          }
        );
      }
    }

    console.log('Done compressing email audit records!');
  },

  async down(queryInterface, Sequelize) {
    // No way to restore HTML from plain text
    return;
  }
};
