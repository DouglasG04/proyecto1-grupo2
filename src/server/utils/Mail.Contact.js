const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 1234;  // change port if needed

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
    const { username, email, phone, message } = req.body;

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kappa@gmail.com',  // add kappa email
            pass: 'contraseña',       // add kappa's
        },
    });

    
    const mailOptions = {
        from: email,  
        to: 'kappa@example.com',  // add kappa email
        subject: 'Nuevo mensaje de contacto',
        html: `
            <p>Nombre de Usuario: ${username}</p>
            <p>Correo electrónico: ${email}</p>
            <p>Número de Teléfono: ${phone}</p>
            <p>Mensaje: ${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ status: 'Correo enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error al enviar el correo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
