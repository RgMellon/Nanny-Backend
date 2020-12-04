import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: true,
  },

  services: {
    type: Array,
    required: true,
  },
});

export default mongoose.model('Host', HostSchema);
