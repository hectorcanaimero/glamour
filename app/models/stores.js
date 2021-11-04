const mongoose = require('mongoose');
const { db } = require('../../config/mongo');

const StoreScheme = new mongoose.Schema({
  "codLoja": {
    "type": Number
  },
  "vlrPrecoRegular": {
    "type": Number
  },
  "vlrParcelaRegular": {
    "type": Number
  },
  "qtdParcelaRegular": {
    "type": Number
  },
  "vlrPrecoClube": {
    "type": Number
  },
  "vlrParcelaClube": {
    "type": Number
  },
  "qtdParcelaClube": {
    "type": Number
  },
  "line": {
    "type": Number
  },
  "host": {
    "type": Number
  },
  "loja": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": 'shops',
    "autopopulate": true
  },
  "product": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": 'products',
    autopopulate:{
      select: '-mercadologico -lstMercadologicoWeb' // remove listed fields from selection
    }
  },
  "campanha": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": 'campanhas',
    "autopopulate": true
  }
},
{
  timestamps: true,
  versionKey: false
});

StoreScheme.plugin(require('mongoose-simple-random'));
StoreScheme.plugin(require('mongoose-paginate-v2'));
StoreScheme.plugin(require('mongoose-autopopulate'));
StoreScheme.index({'product.dscProduto': 'text'});
module.exports = db.model('stores', StoreScheme);