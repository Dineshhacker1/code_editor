const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  content: String,
  roomId: Number,
  version: String,
  message: String
});

const CodeModel = mongoose.model('Code', codeSchema);

module.exports = CodeModel;