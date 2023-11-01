const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const paymentSchema = new Schema({
    headline: {
        type: String,
        required: true,
    },
    cardnumber: {
        type: String,
        required: true,
    },
    expirationday: {
        type: String,
        required: true,
    },
    experationmonth: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    }

})

const ratingSchema = new Schema({
    photo: String,
    name: String,
    lastname: String,
    rating: Number,
    country: String,
    state: String,
    comment: String,
})

const businessSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String,
        required: true,
    },
    fulladdress: {
        province: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        direccion2: String,
        direccion3: String,
        mapdirection: {
            type: String,
            required: true,
        }
    },
    photos: [String],
    phonenumber: String,
    generaldescription: String,
    category: String,
    ratings: [ratingSchema]
})

const userSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String,
        required: true,
    },
    lastname: String,
    idcard: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    birthdate: String,
    phonenumber: String,
    country: String,
    state: String,
    additionaladdress: String,
    typeofuser: String,
    personalphoto: String,
    entitydocumentfront: String,
    entitydocumentback: String,
    password: {
        type: String,
        required: true,
    },
    paymentmethods: [paymentSchema],
    business: [businessSchema],
})




const User = mongoose.model('users', userSchema);

module.exports = User;
