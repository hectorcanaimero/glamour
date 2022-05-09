const mongoose = require('mongoose');
const { dbAdmin } = require('../../config/mongo');

const UserScheme = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'admin' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = dbAdmin.model('users', UserScheme);