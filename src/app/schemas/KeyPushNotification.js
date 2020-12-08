import mongoose from 'mongoose';

const KeyPushNotificationSchema = new mongoose.Schema(
  {
    push_token: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },

    // // qual usuario vai receber a notificacao
    // petshop: {
    //   type: Number,
    //   required: true,
    // },

    // // se a notificacao foi lida ou nao
    // read: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },

    // appointmentId: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

export default mongoose.model('KeyPushNotification', KeyPushNotificationSchema);
