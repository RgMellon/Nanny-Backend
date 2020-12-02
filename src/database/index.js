import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Pet from '../app/models/Pet';
import Petshop from '../app/models/Petshop';
import Procedure from '../app/models/Procedure';
import Banner from '../app/models/Banner';
import Appointment from '../app/models/Appointment';
import View from '../app/models/View';
import PushNotification from '../app/models/PushNotification';
import PushMessage from '../app/models/PushMessage';

// import File from '../app/models/File';
// import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [
  User,
  Pet,
  Petshop,
  Procedure,
  Banner,
  Appointment,
  View,
  PushNotification,
  PushMessage,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    console.log(process.env.MONGO_URL);
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
