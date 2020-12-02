'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'petshops',

      'close_time',
      {
        type: Sequelize.TIME,
        allowNull: false,
        // defaultValue: 0,
      }
    ),

  // down: queryInterface => queryInterface.removeColumn('closeTime'),
  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn('closeTime');
  },
};
