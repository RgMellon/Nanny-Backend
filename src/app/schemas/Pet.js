import mongoose, { Mongoose, VirtualType } from 'mongoose';

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

PetSchema.virtual('url').get(function() {
  return `${process.env.BASE_URL}/files/${this.avatar}`;
});

export default mongoose.model('Pet', PetSchema);
