import Sequelize, { Model } from 'sequelize';

class PushNotification extends Model {
  static init(sequelize) {
    super.init(
      {
        push_token: Sequelize.STRING,
        user_id_push: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default PushNotification;
