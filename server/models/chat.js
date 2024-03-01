const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: String,
    message: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model('chat', chatSchema);