const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'host', 'admin'],
      default: 'user'
    },
    userStatus: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    hostStatus: {
      type: String,
      enum: ["active", "blocked","pending","rejected"],
      default: null,
    },
    hostRequestedAt: {
  type: Date,
  default: null,
},
  },
  { timestamps: true }
);
// Password hashing middleware
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Password comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
