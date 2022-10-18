const jwt = require("jsonwebtoken");

//Middleware
const {sendEmail} = require('../Middleware/email')

const verifyEmail = async (req,res) => {
    const accessToken = req.params.token
    const message = req.cookies["message"];
    const clientEmail = req.cookies["clientEmail"];
    if (!accessToken) {
        res.sendStatus(403);
    } else {
        try {
        const validToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        if(message){
            if(clientEmail !== null){
                sendEmail(validToken.email,"Confirmation","Hello, We have received your Email. Thankyou for your request.!");
                sendEmail(process.env.ADMIN_ID,"New Client Request",message + "Email - " + validToken.email);
                res.clearCookie("clientEmail");
                res.clearCookie("message");
                res.render('confirmed');
            }else{
                res.send("<h1>Link Expired</h1>");
            }
        }else{
            console.log("Message not found. [verifyEmail.js]");
            res.send("<h1>Link Expired</h1>");
        }
        console.log(validToken)
        } catch (error) {
            console.log("[emailVerify.js].validateToken catch error "+error);
            res.send("<h1>Link Expired</h1>");
        }
    }
}

module.exports = {verifyEmail}