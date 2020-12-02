import Sequelize, { Model } from 'sequelize';

class View extends Model {
  static init(sequelize) {
    super.init(
      {
        // petshop_id: Sequelize.INTEGER,
        views: Sequelize.INTEGER,
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
  }
}

export default View;
