'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'pets',

      'created_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('created_at'),
};
