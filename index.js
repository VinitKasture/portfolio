require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require('cookie-parser');

const connectToDB = async function (){
     await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("Database connected!"))
            .catch(err => console.log(err));
} 

connectToDB()

const app = express();

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    const resumeURL = process.env.RESUME_URL;
    res.render('index', {resumeURL})
});

app.use(require('./Routes/index'));

app.listen(app.get('port'), () => {console.log("Listening on port 3000")})