import mongoose from 'mongoose';

const StarSchema = new mongoose.Schema(
  {
    star: {
      type: Number,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

export default mongoose.model('Star', StarSchema);
