const mongoose = require('mongoose');

const UrlScheme = new mongoose.Schema(
  {
    url: { type: String },
    shorty: { type: String },
    count: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
UrlScheme.plugin(require('mongoose-paginate-v2'));
module.exports = mongoose.model('urls', UrlScheme);