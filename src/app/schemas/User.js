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

export default mongoose.model('User', UserSchema);
