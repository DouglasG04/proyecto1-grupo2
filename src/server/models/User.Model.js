const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    _id: ObjectId,
    name: String,
    email: String,
    password: String,
})

const User = mongoose.model('users', userSchema);

module.exports = User;