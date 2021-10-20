const mongoose = require('mongoose');

const { dbAdmin } = require('../../config/mongo');

const FavoritesSchema = new mongoose.Schema(
  {
    "idCliente": { type: Number },
    "product": { type: {} },
  },
  { timestamps: true, versionKey: false }
);

FavoritesSchema.plugin(require('mongoose-paginate-v2'));
module.exports = dbAdmin.model('favorites', FavoritesSchema);