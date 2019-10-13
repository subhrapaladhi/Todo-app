let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    task: String,
    addDate: Date,
    deadline: Date,
    taskDeatials: String
})

const Task = mongoose.model('tasklist', taskSchema);

module.exports = Task;