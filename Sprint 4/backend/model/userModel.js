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
        companyName:{
            type: String,
        },
        vision:{
            type: String,
        },
        industry:{
            type: String,
        },
        location:{
            type: String,
        },
        interview: [{
            job: {
                type: String,
            },
            date: {
                type: Date,
            }
        }]

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)