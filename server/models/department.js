const mongoose = require('mongoose');

const Department = mongoose.model('Department', {
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true
    },
    purpose: {
        type: String,
        minlength: 1,
        trim: true
    }
});

module.exports = {Department};