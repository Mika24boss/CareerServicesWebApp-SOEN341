const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
},
    {
        timestamps: true,
    })
module.exports = mongoose.model('Job', jobSchema)