const mongoose = require('mongoose');
const { dbAdmin } = require('../../config/mongo');

const MarcasScheme = new mongoose.Schema(
  {
    texto: { type: String },
    fornecedor: { type: String },
    image_fornecedor: { type: String },
    nome_fornecedor: { type: String },
    marcas: { type: [] },
  },
  { timestamps: true, versionKey: false }
);

module.exports = dbAdmin.model('marcas', MarcasScheme);