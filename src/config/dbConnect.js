const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://benjinacio03:123hiden@mentacomcha.aatddgn.mongodb.net/?retryWrites=true&w=majority")

let db = mongoose.connection;

module.exports = db;