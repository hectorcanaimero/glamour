const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const { dbAdmin } = require('../../config/mongo');

const CustomersSchema = new mongoose.Schema(
  {
    type: { type: String },
    cpf: { type: String },
    clube: { type: Object },
    description: { type: String },
    images: { type: String },
    others: { type: Object },
    palestra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'palestras',
      autopopulate: true,
    },
  },
  { timestamps: true, versionKey: false }
);
CustomersSchema.plugin(autopopulate);
module.exports = dbAdmin.model('clients', CustomersSchema);