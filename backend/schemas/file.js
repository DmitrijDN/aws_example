var mongoose = require('mongoose');

var file = new mongoose.Schema({
    name: String,
    path: String,
    key: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', file);
