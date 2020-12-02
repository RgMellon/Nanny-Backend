import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        adm: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        cep: Sequelize.STRING,
        district: Sequelize.STRING,
        address: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        phone: Sequelize.STRING,
        address_number: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  check(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // significa que eu tenho o id do file dentro de user
  // static associate(models) {
  //   this.belongsTo(models.File, {
  //     foreignKey: 'avatar_id',
  //     as: 'avatar',
  //   });
  // }
}

export default User;
