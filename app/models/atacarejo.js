const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.DB_URI_ADMIN, { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports = db.model('atacarejo', AtacarejoScheme);