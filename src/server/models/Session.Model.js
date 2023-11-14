const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
