const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');


const app = express();
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(cors({
//     origin: (origin, callback) => {
//         const ACCEPTED_ORIGINS = [
//             'http://localhost:3000',
//             'http://localhost:3001',
//             'http://localhost:1234',
//             'https://localhost:8080',
//             '*',
//             '/'
//         ]

//         if (ACCEPTED_ORIGINS.includes(origin)) {
//             return callback(null, true)
//         }

//         if (!origin) {
//             return callback(null, true)
//         }

//         return callback(new Error('Not allowed by CORS'))
//     }
// }))


const PORT = process.env.PORT || 1234;
const mongoURI = process.env.MONGO_URI || "mongodb+srv://devsolutions:MFu5BRtgADcNHG2L@kuppa.lezxlw2.mongodb.net/kuppa?retryWrites=true&w=majority";


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!\n'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });



//Here, we will import ALL our models to use them in our app routes
const Session = require('./models/Session.Model');
const newSession = require('./session.js')
const User = require('./models/User.Model');


// Here, we will create ALL our app routes
app.get('/', (req, res) => {
    res.send('Running server!')
})


// All the apis that we will create have to use this format /api/...

// Register user
app.post('/api/user/register', async (req, res) => {
    console.log(req.body)
    try {

        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            idcard: req.body.idcard,
            email: req.body.email,
            typeofuser: "C",
            phonenumber: req.body.phonenumber,
            birthdate: req.body.birthdate,
            personalphoto: req.body.personalphoto,
            entitydocumentfront: req.body.entitydocumentfront,
            entitydocumentback: req.body.entitydocumentback,
            password: req.body.password,
            country: req.body.country,
            state: req.body.state,
            additionaladdress: req.body.additionaladdress,
            paymentmethods: req.body.paymentmethods,
            business: req.body.business,
            reservations: req.body.reservations,
        })

        const user = await newUser.save();
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Login user
app.post('/api/user/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            };

            return res.status(404).json(response);
        }

        const session = await newSession(user._id);

        const response = {
            loginUser: user,
            token: session,
            status: res.statusCode,
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding user' });
    }
});

// Delete session token
app.delete('/api/user/logout/:id', async (req, res) => {
    try {
        const tokenSession = await Session.findByIdAndDelete(req.params.id);
        
        if (!tokenSession) {
            const response = {
                message: "Token not found",
                status: 404,
            };

            return res.status(404).json(response);
        }else{
            const response = {
                message: "Session token deleted successfully",
                status: res.statusCode,
            };
    
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error finding token' });
    }
    
    

})


// Get user by ID
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            }

            return res.status(404).json(response);

        }

        const response = {
            user,
            status: res.statusCode,
        }

        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({ message: 'Error finding user' });
    }
})

//Modify user
app.put('/api/user/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!updateUser) {
            const response = {
                message: "User not found",
                status: 404,
            }

            return res.status(404).json(response);
        }

        const response = {
            message: "User updated successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);
        


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete user
app.delete('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            }

            res.status(404).json(response);
            return;
        }

        const response = {
            message: "User deleted successfully",
            status: res.statusCode,
        }

        res.status(200).json(response);
        return;

    } catch (error) {
        return res.status(500).json({ message: 'Error finding user' });
    }
})

// Add payment method
app.post('/api/user/paymentmethod/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            }

            return res.status(404).json(response);

        }

        user.paymentmethods.push(req.body);
        await user.save();

        const response = {
            message: "Payment method added successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({ message: 'Error finding user' });
    }
})

//Delete payment method
app.delete('/api/user/paymentmethod/:id/:methodId', async (req, res) => {
    try {
        const userId = req.params.id;
        const methodId = req.params.methodId;

        const result = await User.findByIdAndUpdate(
            userId,
            { $pull: { paymentmethods: { _id: methodId } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'User or payment method not found' });
        }

        return res.status(200).json({ message: 'Payment method deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment method:', error);
        return res.status(500).json({ message: 'Error deleting payment method' });
    }
});






// It have to be the last route requet
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404/404.html');
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})