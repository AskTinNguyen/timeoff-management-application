'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.describeTable('Companies').then(function(attributes){
      if (attributes.hasOwnProperty('date_format')) {
        return Promise.resolve();
      }

      return queryInterface.addColumn(
        'Companies',
        'date_format',
        {
          type         : Sequelize.STRING,
          allowNull    : false,
          defaultValue : 'YYYY-MM-DD',
        }
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Companies', 'date_format');
  }
};
