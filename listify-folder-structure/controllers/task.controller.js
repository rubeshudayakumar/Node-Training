const warnLogger = require("../utils/logger").warnLogger;

const filterTask = (req,res) => {
    res.send({"message": "filter task router"});
}

const sortTask = (req,res) => {
    res.send({"message" : "sort task route"});
}

const createTask = (req,res) => {
    res.send({"message": "create task route"});
} 

const deleteTask = (req,res) => {
    res.send({"message": "delete task route"});
}

const updateTask = (req,res) => {
    res.send({"message": "update task route"});
}

const readTaskById = (req,res) => {
    res.send({"message" : "read tasks by id router"});
}

const readAllTasks = (req,res) => {
    res.send({"message" : "read all tasks route"});
}

module.exports = {
    filterTask,
    sortTask,
    createTask,
    deleteTask,
    updateTask,
    readTaskById,
    readAllTasks,
}