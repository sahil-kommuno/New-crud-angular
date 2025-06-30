import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image:{
      type: String,
    }
  },
  { timestamps: true }
);
const User = mongoose.model('practiceuserdata', userSchema);

module.exports = User;
  