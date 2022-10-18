
//Middleware
const {createToken} = require('../Middleware/jwt')
const {sendEmail} = require('../Middleware/email');

const errors = [];

const contact = async function (req,res,next) {
    const {clientEmail, message} = req.body;
    const HOST = req.headers.host;
    const emailToken = createToken(clientEmail, "5m");
    const emailSubject = "Email Verification!"
    const emailText = "Please verify your email."
    const emailLink = `http://${HOST}/verifyEmail/${emailToken}`
    res.cookie("message",message ,{httpOnly: true})
    res.cookie("clientEmail",clientEmail ,{httpOnly: true})
    await sendEmail(clientEmail, emailSubject, emailText, emailLink)
    errors.push({msg: `An Email has been sent to ${clientEmail}`});
    res.render('contactMe',{errors})
}

module.exports = {contact}