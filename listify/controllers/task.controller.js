const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const taskService = require("../services/task.services");
const {httpSuccessObject} = require("../utils/responseObject");

const createTask = async (req,res) => {
    try{
        if(!validator.taskValidator(req.body)){
            throw new Error("tasks details are invalid");
        }
        const taskData = await taskService.readTask(req,res);
        console.log(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId));
        if(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId)!=-1){
            throw new Error("task with this id already exists");
        }
        taskData[req.user.userName].push(req.body);
        await taskService.writeTask(req,res,taskData);
        httpSuccessObject(req,res,{message: "task was created successfully"});
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
            httpSuccessObject(req,res,{message : "there are no tasks to display"})
        }else{
            httpSuccessObject(req,res,userTasks);
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
        httpSuccessObject(req,res,{message : "task not found"});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
}

const updateTask = async (req,res) => {
    try{
        const taskData = await taskService.readTask(req,res);
        const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId);
        if(taskIndex==-1){
            throw new Error("task doesn't exists");
        }
        if(!validator.taskValidator(req.body)){
            throw new Error("tasks details are invalid");
        }
        taskData[req.user.userName][taskIndex] = req.body;
        await taskService.writeTask(req,res,taskData);
        httpSuccessObject(req,res,{message : "task was updated successfully"});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }   
}

const deleteTask = async (req,res) => {
    try{
        if(validator.taskIdValidator(req.body.taskId) == false){
            throw new Error("invalid id");
        }
        const taskData = await taskService.readTask(req,res);
        const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId);
        if(taskIndex==-1){
            throw new Error("can't delete the task which doesn't exists");
        }
        taskData[req.user.userName].splice(taskIndex,1);
        await taskService.writeTask(req,res,taskData);
        httpSuccessObject(req,res,{message : "task was deleted successfully"});
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

module.exports = {
    filterTask,
    sortTask,
    createTask,
    deleteTask,
    updateTask,
    readTaskById,
    readAllTasks,
}