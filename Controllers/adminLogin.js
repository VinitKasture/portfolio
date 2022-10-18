let errors = [];;

const {createToken} = require('../Middleware/jwt')

const adminLogin = function (req,res) {
    const {email,password} = req.body;
    if(email === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD){
        const user = {email,password}
        const token = createToken(user);
        res.cookie("Token",token ,{httpOnly: true})
        res.redirect('/adminDashboard')
    }else{
        errors.push({msg: "Invalid Credentials!"})
        res.render("login", {errors})
    }
}
module.exports = {adminLogin}