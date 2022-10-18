const jwt = require("jsonwebtoken");

//Middleware
const {sendEmail} = require('../Middleware/email')

const verifyEmail = async (req,res) => {
    const accessToken = req.params.token
    const message = req.cookies["message"];

    console.log(message)
    function validateToken (req,res){
        if (!accessToken) {
            res.sendStatus(403);
        } else {
            try {
            const validToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
            if(message){
                sendEmail(validToken.email,"Confirmation","Hello, We have received your Email. Thankyou for your request.!");
                sendEmail(process.env.ADMIN_ID,"New Client Request",message);
            }else{
                console.log("Message not found. [verifyEmail.js]")
            }
            console.log(validToken)
            } catch (error) {
                console.log("[emailVerify.js].validateToken catch error "+error);
            }
        }
    };
    validateToken();
    res.render('confirmed')
}


module.exports = {verifyEmail}