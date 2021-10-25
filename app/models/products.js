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
  },
  { timestamps: true, versionKey: false }
);

module.exports = db.model('products', ProductScheme);