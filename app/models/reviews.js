const mongoose = require('mongoose');
const paginate  =require('mongoose-paginate-v2');

const { dbAdmin } = require('../../config/mongo');

const ReviewSchema = new mongoose.Schema(
  {
    png: { type: String },
    jpg: { type: String },
    status: { type: Number, default: 0 },
    obs: { type: String },
    product: { type: Object }
  },
  { timestamps: true, versionKey: false }
);

ReviewSchema.plugin(paginate);
module.exports = dbAdmin.model('reviews', ReviewSchema);