import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function save(next) {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
      return next();
    }
  } catch (err) {
    return next(err);
  }
});

UserSchema.virtual('url').get(function() {
  return `${process.env.BASE_URL}/files/${this.image}`;
});

export default mongoose.model('User', UserSchema);
