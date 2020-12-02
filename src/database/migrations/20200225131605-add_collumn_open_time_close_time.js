'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'petshops',

      'open_time',
      {
        type: Sequelize.TIME,
        allowNull: false,
        // defaultValue: 0,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('status'),
};
