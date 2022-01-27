const mongoose = require('mongoose')
const { db } = require('../../config/mongo');

const MenuScheme = new mongoose.Schema({
  indNivel: { type: Number },
  codMercadologico: { type: Number },
  dscMercadologico: { type: String },
  slug: { type: String },
  setor: { type: Array, },
  image: { type: String }
},

{ timestamps: true, versionKey: false });

module.exports = db.model('menus', MenuScheme)