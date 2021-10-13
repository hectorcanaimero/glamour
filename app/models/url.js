const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.DB_URI_ADMIN, { useNewUrlParser: true, useUnifiedTopology: true });

const UrlScheme = new mongoose.Schema(
  {
    url: { type: String },
    shorty: { type: String },
    count: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
UrlScheme.plugin(require('mongoose-paginate-v2'));
module.exports = db.model('urls', UrlScheme);