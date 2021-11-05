const mongoose = require('mongoose');

const db = mongoose.createConnection(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const dbAdmin = mongoose.createConnection(process.env.DB_URI_ADMIN, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = { dbAdmin, db };