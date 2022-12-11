const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;