const nodeMailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => {
    const {ADMIN_ID, AUTH_PASSWORD} = process.env
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: ADMIN_ID,
                pass: AUTH_PASSWORD
            }
        });

        await transporter.sendMail({
            from: ADMIN_ID,
            to: email,
            subject: subject,
            text: text,
            html: html ? `<a href=${html}>Link</a> `: " " + text ? text : " "
        })

        console.log("EMAIL SENT SUCCESSFULLY!")
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {sendEmail}