'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',

      'address_number',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('procedure_id'),
};
