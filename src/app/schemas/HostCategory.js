import mongoose from 'mongoose';

const HostCategorySchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },

    user_id: {
      type: String,
    },

    category_id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },

  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

export default mongoose.model('HostCategory', HostCategorySchema);
