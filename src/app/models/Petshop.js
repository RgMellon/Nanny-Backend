import Sequelize, { Model } from 'sequelize';

class Petshop extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar: Sequelize.STRING,
        background_image: Sequelize.STRING,
        address: Sequelize.STRING,
        address_number: Sequelize.INTEGER,
        city: Sequelize.STRING,
        district: Sequelize.STRING,
        phone: Sequelize.STRING,
        user_id: Sequelize.NUMBER,
        openTime: Sequelize.TIME,
        closeTime: Sequelize.TIME,

        url_avatar: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.BASE_URL}/files/${this.avatar}`;
          },
        },

        url_imagebackground: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.BASE_URL}/files/${this.background_image}`;
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
    this.hasMany(models.Procedure, {
      foreignKey: 'petshop_id',
      as: 'procedures',
    });
  }
}

export default Petshop;
