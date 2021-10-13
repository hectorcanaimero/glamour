const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.DB_URI_ADMIN, { useNewUrlParser: true, useUnifiedTopology: true });

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
  },
    password: {
      type: String
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = db.model('users', UserScheme);