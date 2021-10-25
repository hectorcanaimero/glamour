const mongoose = require('mongoose');

const { dbAdmin } = require('../../config/mongo');

const FavoritesSchema = new mongoose.Schema(
  {
    "cpf": { type: Number },
    "products": { type: Array },
  },
  { timestamps: true, versionKey: false }
);

FavoritesSchema.plugin(require('mongoose-paginate-v2'));
module.exports = dbAdmin.model('favorites', FavoritesSchema);