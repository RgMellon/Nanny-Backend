'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'pets',

      'updated_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('updated_at'),
};
