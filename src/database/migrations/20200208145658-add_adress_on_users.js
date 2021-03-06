'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',

      'address',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('procedure_id'),
};
