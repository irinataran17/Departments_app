const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    department: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    hired: {
        type: Date,
        default: Date.now
    }
});

module.exports = {Employee};