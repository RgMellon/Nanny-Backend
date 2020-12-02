import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    // qual usuario vai receber a notificacao
    petshop: {
      type: Number,
      required: true,
    },

    // se a notificacao foi lida ou nao
    read: {
      type: Boolean,
      required: true,
      default: false,
    },

    appointmentId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
