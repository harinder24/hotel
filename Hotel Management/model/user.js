
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    role: {
        type: String,
        required: true
    },
    room101: {
        type: Boolean
    },
    room102: {
        type: Boolean
    },
    room103: {
        type: Boolean
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;