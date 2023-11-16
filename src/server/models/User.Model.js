const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reservationsSchema = new Schema({
    amount: String,
    checkin: String,
    checkout: String,
    businessName: String,
})

const paymentSchema = new Schema({
    bank: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    cardnumber: {
        type: String,
        required: true,
        unique: true,
    },
    expirationmonth: {
        type: String,
        required: true,
    },
    experationyear: {
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
    statusBusiness: Boolean,
    name: {
        type: String,
        required: true,
    },
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
    },
    photos: [String],
    phonenumber: String,
    generaldescription: String,
    category: String,
    ratings: [ratingSchema]
})


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    lastname: String,
    idcard: String,
    birthdate: String,
    phonenumber: String,
    country: String,
    state: String,
    additionaladdress: String,
    typeofuser: String,
    personalphoto: String,
    entitydocumentfront: String,
    entitydocumentback: String,

    reservations: [reservationsSchema],
    paymentmethods: [paymentSchema],
    business: [businessSchema],
})




const User = mongoose.model('users', userSchema);

module.exports = User;
