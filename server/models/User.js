const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    uid: { type: Number },
    username: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: 'Normal',
      enum: ['Normal', 'Premium', 'Administrator'],
    },

    statusOfUser: {
      type: String,
      default: 'Enabled',
      enum: ['Enabled', 'Disabled'],
    },

    refreshToken: {
      type: String,
    },

    notifications: [
      {
        type: ObjectId,
        ref: 'Notification',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
