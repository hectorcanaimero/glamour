const mongoose = require('mongoose');

const { db } = require('../../config/mongo');

const CampanhaScheme = new mongoose.Schema({
  "cod_campanha": {
    "type": Number
  },
  "nom_campanha": {
    "type": String
  },
  "dsc_situacao": {
    "type": String
  },
  "dta_vigencia_inicio": {
    "type": String
  },
  "dta_vigencia_fim": {
    "type": String
  },
  "dsc_tipo_campanha": {
    "type": String
  },
  "obs_campanha": {
    "type": String
  },
  "lst_plataforma": {
    "type": []
  },
  "cod_tipo_campanha": {
    "type": Number
  },
  "slug": {
    "type": String
  }
},
{
  timestamps: true,
  versionKey: false
});

CampanhaScheme.plugin(require('mongoose-paginate-v2'));
module.exports = db.model('campanhas', CampanhaScheme);