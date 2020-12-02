import Sequelize, { Model } from 'sequelize';

class Banner extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        banner: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.BASE_URL}/files/${this.banner}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Banner;
