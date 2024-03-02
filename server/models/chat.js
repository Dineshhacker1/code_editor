const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: String,
    message: String,
    roomId : Number
},
    {
        timestamps: true
    });

module.exports = mongoose.model('chat', chatSchema);