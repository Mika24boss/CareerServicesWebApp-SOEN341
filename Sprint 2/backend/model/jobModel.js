const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    jobID: {
        type: Number
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    companyName: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
},
    {
        timestamps: true,
    })
module.exports = mongoose.model('Job', jobSchema)