const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a text value'],
    },
        description: {
        type: String,
            required: true },
},
    {
        timestamps: true,
    })
module.exports = mongoose.model('Job', jobSchema)