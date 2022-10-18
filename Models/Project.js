const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);