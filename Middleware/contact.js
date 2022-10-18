
//Middleware
const {createToken} = require('../Middleware/jwt')
const {sendEmail} = require('../Middleware/email');

const errors = [];

function randomNumber(a, b) {
    const randomNumber = Math.floor(a + (b - a) * Math.random());
    return randomNumber;
}

const contact = async function (req,res,next) {
    const {clientEmail, message} = req.body;
    const HOST = req.headers.host;
    const emailToken = createToken(clientEmail);
    const emailSubject = "Email Verification!"
    const emailText = "Please verify your email."
    const emailLink = `http://${HOST}/verifyEmail/${emailToken}`
    res.cookie("message",message ,{httpOnly: true})
    await sendEmail(clientEmail, emailSubject, emailText, emailLink)
    errors.push({msg: `An Email has been sent to ${clientEmail}`});
    const user = {clientEmail,message};
    const token = createToken(user);
    res.cookie("clientToken", token, { httpOnly: true });
    res.render('contactMe',{errors})
}

module.exports = {contact}