'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',

      'cep',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    ),

  down: queryInterface => queryInterface.removeColumn('procedure_id'),
};
