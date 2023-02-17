const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        CV: {
            type: Buffer
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['Admin', 'Employer', 'Student'],
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)