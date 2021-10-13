const mongoose = require('mongoose')

const MenuScheme = new mongoose.Schema(
  {
    indNivel: { type: Number },
    codMercadologico: { type: Number },
    dscMercadologico: { type: String },
    slug: { type: String },
    setor: { type: Array, }
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('menus', MenuScheme)