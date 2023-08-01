const mongoose = require("mongoose");


const messagesSchemaBen = new mongoose.Schema(
    {
        text: {type: String, required: true}
    }
)



const messagesBenDb = mongoose.model('messagesBen', messagesSchemaBen);


module.exports = messagesBenDb;


