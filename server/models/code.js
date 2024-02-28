const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  content: String,
  roomId: Number,
  version: String,
  message: String,
}, 
{
  timestamps: true,
});

const CodeModel = mongoose.model('Code', codeSchema);

module.exports = CodeModel;