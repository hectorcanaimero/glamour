const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.DB_URI_ADMIN, { useNewUrlParser: true, useUnifiedTopology: true });

const UrlDataScheme = new mongoose.Schema(
  {
    "url": {
      "type": mongoose.Schema.Types.ObjectId,
      "ref": 'urls', "autopopulate": true
    },
    "data": { "type": String }
  },
  { timestamps: true, versionKey: false }
);
UrlDataScheme.plugin(require('mongoose-autopopulate'));
module.exports = db.model('url_data', UrlDataScheme);