const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const taskService = require("../services/task.services");

const createTask = async (req,res) => {
    try{
        if(!validator.taskValidator(req.body)){
            throw new Error("tasks details are invalid");
        }
        const taskData = await taskService.readTask(req,res);
        taskData[req.user.userName].push(req.body);
        await taskService.writeTask(req,res,taskData);
        res.send({message: "task was created successfully"});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
} 

const readAllTasks = async (req,res) => {
    try{
        const tasks = await taskService.readTask(req,res);
        const userTasks = tasks[req.user.userName];
        if(userTasks.length == 0){
            res.status(404).send({message : "there are no tasks to display"})
        }else{
            res.status(200).send(userTasks);
        }
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
}

const readTaskById = async (req,res) => {
    try{
        const userTasks = await taskService.readTask(req,res);
        const tasks = userTasks[req.user.userName];
        if(validator.taskIdValidator(req.body.taskId) == false){
            throw new Error("invalid id");
        }
        let isTaskFound = false;
        let taskData = {};
        tasks.forEach(task => {
            if(task.taskId==req.body.taskId){
                taskData = task;
                isTaskFound = true;
            }
        });
        if(isTaskFound) return res.status(200).send(taskData);
        res.send({message : "task not found"});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
}

const filterTask = (req,res) => {
    res.send({"message": "filter task router"});
}

const sortTask = (req,res) => {
    res.send({"message" : "sort task route"});
}

const deleteTask = (req,res) => {
    res.send({"message": "delete task route"});
}

const updateTask = (req,res) => {
    res.send({"message": "update task route"});
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