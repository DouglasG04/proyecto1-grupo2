const express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');
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
const mongoURI = process.env.MONGO_URI || "mongodb+srv://devsolutions:MFu5BRtgADcNHG2L@kuppa.lezxlw2.mongodb.net/Kuppa?retryWrites=true&w=majority";


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
const sendMail = require('./utils/Mail.Util.js');


// Here, we will create ALL our app routes
app.get('/', (req, res) => {
    res.send('Running server!')
})


// All the apis that we will create have to use this format /api/...


// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Register user
app.post('/api/user/register', async (req, res) => {
    console.log(req.body)
    try {

        if (res.statusCode == 500) {
            return res.status(500).json({ message: 'Error in register user' });
        }

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
        const user = await User.findOne({ email: req.body.email, password: req.body.password });

        if (!user) {
            const response = {
                message: "Something went wrong",
                status: 401,
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
        return res.status(500).json({ message: 'Something went wrong', status: 500 });
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
        } else {
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



//Recover email
app.post('/api/user/recover', async (req, res) => {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Correo no encontrado", status: 404 });
        }

        const link = `http://127.0.0.1:5500/src/public/pages/render-login/password.html?id=${user._id}`;

        const emailBody = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
            <h1>Recuperacion de contraseña</h1>
            <p>Para recuperar su contraseña da click en el siguiente link</p>
            <a href="${link}">Recuperar contraseña</a>
          </body>
        </html>
        `;

        const mailSent = await sendMail(email, "Recuperar contraseña", emailBody);

        if (mailSent) {
            return res.status(200).json({ message: "Email enviado correctamente", status: 200 });
        } else {
            return res.status(500).json({ message: "Error enviando email", status: 500 });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});




// Recover password
app.post('/api/user/recover/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            };

            return res.status(404).json(response);
        }

        user.password = req.body.password;
        await user.save();

        const response = {
            message: "Password updated successfully",
            status: res.statusCode,
        };

        return res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: error.message })
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
        return res.status(500).json({ message: 'Something went wrong' });
    }
})

//Modify user
app.put('/api/user/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updateUser) {
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
        return res.status(500).json({ message: 'Something went wrong' });
    }
})

// Add business
app.post('/api/user/business/new/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(req.body);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        // Verifica los campos requeridos antes de agregar el negocio
        const { name, province, city, price, address, address_two, address_three, mapdirection, photos, phone, description, category, ratings } = req.body;


        const newBusiness = {
            _id: new mongoose.Types.ObjectId(),
            name,
            province,
            state: city,
            direccion: address,
            direccion2: address_two,
            direccion3: address_three,
            mapdirection,
            photos,
            price: price,
            phonenumber: phone,
            generaldescription: description,
            category,
            ratings,
            statusBusiness: false,
        };

        user.business.push(newBusiness);
        await user.save();


        const link = `http://127.0.0.1:5500/src/public/pages/render-new-business/aprovebusiness.admin.html?id=${user._id}&businessId=${newBusiness._id}`;

        const htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
            <h1>Aprobar negocio</h1>
            <p>Tienes una solicitud de negocio, para aprobar el negocio da click en el siguiente link</p>
            <a href="${link}">Ver negocio</a>
          </body>
        </html>

        `
        sendMail("devsolutionscenfotec@gmail.com", "Solicitud de aprobación de negocio", htmlBody)

        return res.status(200).json({ message: "Negocio agregado exitosamente", status: 200 });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get business by ID
app.get('/api/user/business/:id/:businessId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            }

            return res.status(404).json(response);

        }

        const business = user.business.find(business => business._id == req.params.businessId);

        if (!business) {
            const response = {
                message: "Business not found",
                status: 404,
            }

            return res.status(404).json(response);
        }

        const response = {
            user,
            business,
            status: res.statusCode,
        }

        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
})

// Change status business
app.put('/api/user/business/:id/:businessId', async (req, res) => {
    try {
        const { id, businessId } = req.params;
        const { statusBusiness } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        const business = user.business.find(business => business._id == businessId);

        if (!business) {
            return res.status(404).json({ message: "Business not found", status: 404 });
        }

        business.statusBusiness = statusBusiness;
        await user.save();


        if (statusBusiness === true) {
            const htmlBody = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </head>
              <body>
                <h1>Negocio aprobado</h1>
                <p>Su negocio ha sido aprobado, ya puedes verlo en tu perfil!</p>
                <a href="http://127.0.0.1:5500/src/public/pages/render-login/login.html">Ver negocio</a>
              </body>
            </html>
    
            `
            sendMail(user.email, "Aprobacion de negocio", htmlBody)
        } else if (statusBusiness === false) {
            const htmlBody = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </head>
              <body>
                <h1>Negocio rechazado</h1>
                <p>Su negocio ha sido rechazado, no cumple los requisitos para ser publicado</p>
              </body>
            </html>
    
            `
            sendMail(user.email, "Negocio negado", htmlBody)
        }

        return res.status(200).json({ message: "Status changed successfully", status: 200 });



    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});




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
        return res.status(500).json({ message: 'Something went wrong' });
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


// Add reservation method
app.post('/api/user/reservation/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const response = {
                message: "User not found",
                status: 404,
            }

            return res.status(404).json(response);

        }

        user.reservations.push(req.body);
        await user.save();

        const htmlBody = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </head>
              <body>
                <h1>Reservación hecha</h1>
                <p>Ya puedes visualizar la reserva en tu perfil!</p>
              </body>
            </html>
    
            `
        sendMail(user.email, "Resevacion lista", htmlBody)

        const response = {
            message: "Reservation added successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
})

// Add rating for business
app.post('/api/user/business/rating/:id/:businessId', async (req, res) => {
    try {
        const { id, businessId } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        const business = user.business.find(business => business._id == businessId);

        if (!business) {
            return res.status(404).json({ message: "Business not found", status: 404 });
        }

        business.ratings.push(req.body);
        await user.save();

        const response = {
            message: "Rating added successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


// Modify reservation method because of the checkin and checkout
app.put('/api/user/reservation/:id/:reservationId', async (req, res) => {
    try {
        const { id, reservationId } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        // Go trough all the reservations and find the one that matches the id of the params
        const reservation = user.reservations.find(reservation => reservation._id == reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found", status: 404 });
        }

        reservation.checkin = req.body.checkin;
        reservation.checkout = req.body.checkout;
        await user.save();

        const response = {
            message: "Reservation updated successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})



// Delete reservation 
app.delete('/api/user/reservation/:id/:reservationId', async (req, res) => {
    try {
        const userId = req.params.id;
        const reservationId = req.params.reservationId;

        const result = await User.findByIdAndUpdate(
            userId,
            { $pull: { reservations: { _id: reservationId } } },
            { new: true }
        );



        if (!result) {
            return res.status(404).json({ message: 'User or reservation not found' });
        }

        const response = {
            message: "Reservation deleted successfully",
            status: res.statusCode,
        }

        return res.status(200).json(response);

    } catch (error) {
        console.error('Error deleting reservation:', error);
        return res.status(500).json({ message: 'Error deleting reservation' });
    }
});


app.post('/api/user/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const subject = 'Nuevo comentario de usuario';
        const htmlBody = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body>
                    <h1>Nuevo Comentario</h1>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> ${phone}</p>
                    <p><strong>Mensaje:</strong> ${message}</p>
                </body>
            </html>
        `;
        const mail = await sendMail("devsolutionscenfotec@gmail.com", subject, htmlBody);

        return res.status(200).json({ message: "Comentario enviado con éxito", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// It have to be the last route requet
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404/404.html');
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})