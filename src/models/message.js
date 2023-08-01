const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
    {
        text: {type: String, required: true}
    }
)


const messages = mongoose.model('messages', messagesSchema);


module.exports = messages;