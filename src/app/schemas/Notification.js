import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    // phone: {
    //   type: String,
    //   required: true,
    // },

    //o usuario que vai enviar a mensagem
    user: {
      type: Object,
      required: true,
    },

    //o usuario que vai receber a mensagem
    user_id: {
      type: String,
      required: true,
    },

    // se a notificacao foi lida ou nao
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
