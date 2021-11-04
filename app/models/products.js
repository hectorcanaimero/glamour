const mongoose = require('mongoose');

const { db } = require('../../config/mongo');

const ProductScheme = new mongoose.Schema(
  {
    "images": { "type": {} },
    "like": { "type": Number },
    "line": { "type": Number },
    "slug": { "type": String },
    "lstEan": { "type": Array },
    "status": { "type": Number },
    "dscCombo": { "type": String },
    "codProduto": { "type": Number },
    "nomProduto": { "type": String },
    "embalagemVenda": { "type": [] },
    "dscDetalheProduto": { "type": String },
    "dscInformacaoLegal": { "type":  String  },
    "favorites": {
      "type": mongoose.Schema.Types.ObjectId,
      "ref": 'favorites', "autopopulate": true
    }
  },
  { timestamps: true, versionKey: false }
);
ProductScheme.index({'dscProduto': 'text'});
module.exports = db.model('products', ProductScheme);