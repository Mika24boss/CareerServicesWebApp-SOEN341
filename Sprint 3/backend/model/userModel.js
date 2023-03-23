const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['Admin', 'Employer', 'Student'],
            required: true
        },
        profilePicture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        },

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)