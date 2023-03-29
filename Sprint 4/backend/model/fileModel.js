const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('File', FileSchema)