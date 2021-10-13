const mongoose = require('mongoose');

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
module.exports = mongoose.model('url_data', UrlDataScheme);