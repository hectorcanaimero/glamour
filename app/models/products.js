const mongoose = require('mongoose')

const ProductScheme = new mongoose.Schema({
  "codProduto": {
    "type": Number
  },
  "nomProduto": {
    "type": String
  },
  "slug": {
    "type": String
  },
  "dscDetalheProduto": {
    "type": String
  },
  "dscCombo": {
    "type": String
  },
  "lstEan": {
    "type": String
  },
  "embalagemVenda": {
    "type": []
  },
  "dscInformacaoLegal": {
    "type": { "type": String, "type": Number, "type": String }
  },
  "status": {
    "type": Number
  },
  "line": {
    "type": Number
  }
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('products', ProductScheme)