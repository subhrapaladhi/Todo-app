let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    task: String,
    details: String
})

const Task = mongoose.model('tasklist', taskSchema);

module.exports = Task;