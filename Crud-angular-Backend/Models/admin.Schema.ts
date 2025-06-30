import mongoose from 'mongoose';
const bcrypt = require("bcrypt")

const loginSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
loginSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const Admin = mongoose.model('adminlogindata', loginSchema);

module.exports = Admin;
