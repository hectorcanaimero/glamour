const mongoose = require('mongoose');
const { dbAdmin } = require('../../config/mongo');

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
module.exports = dbAdmin.model('url_datas', UrlDataScheme);