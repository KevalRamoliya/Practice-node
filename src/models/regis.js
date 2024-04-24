const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    confirmpassword: {
        type: Number,
        required: true,
    },

})



//Create model for employee
const register = mongoose.model('registerdata', employeeSchema);

module.exports = register;