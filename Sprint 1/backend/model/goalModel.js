const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
    title: {
        type: String,
        required: true
    },
    applied: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
})

goalSchema.plugin(AutoIncrement, {
    inc_field: 'job',
    id: 'jobNums',
    start_seq: 500
})
module.exports = mongoose.model('Goal', goalSchema)