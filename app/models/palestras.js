const mongoose = require('mongoose');

const { dbAdmin } = require('../../config/mongo');

const PalestrasSchema = new mongoose.Schema(
  {
    nome: { type: String },
    patrocinantes: { type: String },
    descricao: { type: String },
    palestrante: { type: String },
    data: { type: String },
    hora: { type: String },
    qtd: { type: Number },
    participantes: { type: Number },
    loja: { type: Object }
  },
  { timestamps: true, versionKey: false }
);

module.exports = dbAdmin.model('palestras', PalestrasSchema);