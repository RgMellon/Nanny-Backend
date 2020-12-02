'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'procedures',

      'price',
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('price'),
};
