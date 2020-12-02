import Sequelize, { Model } from 'sequelize';

class PushMessage extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.INTEGER,
        read: Sequelize.BOOLEAN,
        message: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Petshop, {
      foreignKey: 'petshop_id',
      as: 'petshop',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default PushMessage;
