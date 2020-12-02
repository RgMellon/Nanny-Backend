import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        // user_id: Sequelize.INTEGER,
        // petshop_id: Sequelize.INTEGER,
        // pet_id: Sequelize.INTEGER,
        date: Sequelize.DATE,
        status: Sequelize.INTEGER,
        // procedure_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pet, {
      foreignKey: 'pet_id',
      as: 'pets',
    });

    this.belongsTo(models.Petshop, {
      foreignKey: 'petshop_id',
      as: 'petshop',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    this.belongsTo(models.Procedure, {
      foreignKey: 'procedure_id',
      as: 'procedure',
    });
  }
}

export default Appointment;
