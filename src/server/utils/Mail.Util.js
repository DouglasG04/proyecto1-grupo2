const nodemailer = require('nodemailer');

const sendMail = async (sentTo, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'devsolutionscenfotec@gmail.com',
                pass: 'vavb jedw oxwq mhcc',
            },
        });

        const mailOptions = {
            from: 'devsolutionscenfotec@gmail.com',
            to: sentTo,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = sendMail;