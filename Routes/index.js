const express = require('express').Router();
const router = express;

//Controllers
const {adminLogin} = require('../Controllers/adminLogin')
const {addProject, allProjects, deleteProject, showProjects} = require('../Controllers/projects')
const {verifyEmail} = require('../Controllers/emailVerify')

//Middleware
const {validateToken} = require('../Middleware/jwt')
const {contact} = require('../Middleware/contact')

router.get('/admin', (req,res) => {res.render('login');})

router.post("/loginAdmin",adminLogin)

router.get('/adminDashboard',validateToken,(req,res) =>{res.render('adminDashboard')})

router.post('/addProject', validateToken, addProject)

router.get('/allProjects', validateToken, allProjects)

router.get('/delete/:id', validateToken, deleteProject)

router.get('/showProjects', showProjects)

router.get('/contactMe', (req,res) => {res.render('contactMe')})

router.post('/contactMe', contact);

router.get('/verifyEmail/:token', verifyEmail);

module.exports = router;