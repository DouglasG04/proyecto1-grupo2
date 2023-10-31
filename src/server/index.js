const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:1234',
            'https://localhost:8080',
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))


const PORT = process.env.PORT || 1234;
const mongoURI = process.env.MONGO_URI || "mongodb+srv://GxnzaCR:B3JrojLWvjHEldKo@cluster0.aowwazw.mongodb.net/Kupaa?retryWrites=true&w=majority";


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });



//Here, we will import ALL our models to use them in our app routes
const User = require('./models/User.Model');


// Here, we will create ALL our app routes
app.get('/', (req, res) => {
    res.send('Running server!')
})


// All the apis that we will create have to use this format /api/...
app.post('/api/user/new', async (req, res) => {
    console.log(req.body)
    try {
        const newUser = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            birthdate: req.body.birthdate,
            personalphoto: req.body.uploadPhoto,
            entitydocumentfront: req.body.entitydocFront,
            entitydocumentback: req.body.entitydocBack,
            password: req.body.password,
            country: req.body.country,
            state: req.body.state,
            additionaladdress: req.body.additionaladdress,
        })

        // const user = await newUser.save();
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


// It have to be the last route requet
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404/404.html');
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})