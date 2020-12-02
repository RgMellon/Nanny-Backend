import Sequelize, { Model } from 'sequelize';

class Procedure extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        avatar: Sequelize.STRING,
        description: Sequelize.TEXT,
        petshop_id: Sequelize.INTEGER,
        price: Sequelize.REAL,

        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.BASE_URL}/files/${this.avatar}`;
          },
        },
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

export default Procedure;
