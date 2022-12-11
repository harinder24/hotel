const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    num: {
        type: String,
        required: true,
        unique: true
    },
    book: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
});

const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;