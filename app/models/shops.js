const mongoose = require('mongoose')
const { db } = require('../../config/mongo');

const ShopScheme = new mongoose.Schema({
  "nome": {
    "type": String
  },
  "code": {
    "type": Number
  },
  "region": {
    "type": Number
  },
  "slug": {
    "type": String
  },
  "slug_cidade": {
    "type": String
  },
  "sitemercado": {
    "type": String
  }
},
    {
      timestamps: true,
      versionKey: false
    })

ShopScheme.plugin(require('mongoose-paginate-v2'))

module.exports = db.model('shops', ShopScheme)