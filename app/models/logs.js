const mongoose = require('mongoose');

const LogsScheme = new mongoose.Schema(
  {
    "status": { type: String },
    "url": { type: String },
    "data": { type: [] },
    "phone": { type: [] },
    "request": { "type": [] },
    "response": { "type": [] }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('logs', LogsScheme);