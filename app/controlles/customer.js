const mongoose = require('mongoose');
const { dbInf } = require('../../config/mongo');

const campain = require('./campains');

const CustomerScheme = new mongoose.Schema(
  {
    name: { type: String },
    cpf: { type: Number },
    phone: { type: String },
    email: { type: String },
    cupons: { type: String },
    campain: { type: mongoose.Schema.Types.ObjectId, ref: 'campains', autopopulate: true }
  },
  { timestamps: true, versionKey: false }
);

ClienteScheme.post('save', async (doc) =>{
  const item = await campain.findById(doc.campain);
  if (item.cupons > item.cadastro ) {
    item.cadastro = item.cadastro + 1;
    item.save();
  }
});

CustomerScheme.plugin(require('mongoose-autopopulate'));

module.exports = dbInf.model('customer', CustomerScheme);