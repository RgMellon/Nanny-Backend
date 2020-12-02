'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'appointments',

      'procedure_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('procedure_id'),
};
