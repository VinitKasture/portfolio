const Project = require('../Models/Project')


const fetchProjects = async function (req,res) {
    let projects = await Project.find();
    return projects
}

const HTMLProjects = async function (req,res) {
    const projects = await fetchProjects();
    const HTMLProjects = [];
    for (i = 0; i < projects.length; i++) {
        const project = projects[i]
        if(project.Category == "HTML5"){
            HTMLProjects.push(project);
        }
    }
    return HTMLProjects
}

const NodejsProjects = async function (req,res) {
    const projects = await fetchProjects();
    const NodejsProjects = [];
    for (i = 0; i < projects.length; i++) {
        const project = projects[i]
        if(project.Category == "Nodejs"){
            NodejsProjects.push(project);
        }
    }
    return NodejsProjects
}

const addProject = async function (req,res) {
    const {URL, Category, Name} = req.body;
    const newProject = new Project ({
        Name ,
        Category ,
        URL 
    })
    newProject.save();
    res.render('adminDashboard')
}

const allProjects = async function(req, res, next){
    const HTMLProjectsArr = await HTMLProjects();
    const NodejsProjectsArr = await NodejsProjects();
    res.render('allProjects', {HTMLProjectsArr, NodejsProjectsArr})
}

const deleteProject = async function (req,res) {
    const id = req.params.id;
    const validProject = await Project.findById(id);
    if(validProject){
        await Project.findByIdAndDelete(id);
        res.render('allProjects')
    }else{
        res.sendStatus(403)
    }
}

const showProjects = async function (req,res){
    const HTMLProjectsArr = await HTMLProjects();
    const NodejsProjectsArr = await NodejsProjects();
    res.render('showProjects', {HTMLProjectsArr, NodejsProjectsArr})
}

module.exports = {fetchProjects, addProject, allProjects, deleteProject, showProjects};