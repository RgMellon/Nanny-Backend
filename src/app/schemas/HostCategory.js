import mongoose from 'mongoose';

const HostCategorySchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },

    category_id: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

export default mongoose.model('HostCategory', HostCategorySchema);
