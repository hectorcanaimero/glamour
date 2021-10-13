const mongoose = require('mongoose');

const AtacarejoScheme = new mongoose.Schema(
  {
    "type": { type: Number },
    "cpfcnpj": { type: String },
    "name": { type: String },
    "phone": { type: String },
    "data": { type: [] },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('atacarejo', AtacarejoScheme);