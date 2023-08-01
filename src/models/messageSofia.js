const mongoose = require("mongoose");


const messagesSchemaSoso = new mongoose.Schema(
    {
        text: {type: String, required: true}
    }
)

const messagesSosoDb = mongoose.model('messagesSoso', messagesSchemaSoso);


module.exports = messagesSosoDb;


