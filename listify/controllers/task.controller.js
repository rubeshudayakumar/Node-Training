const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const taskService = require("../services/task.services");
const {httpSuccessObject, httpWarnObject} = require("../utils/responseObject");

const createTask = async (req,res) => {
    if(!validator.taskValidator(req.body)){
        return httpWarnObject(req,res,"tasks details are invalid");
    }
    const taskData = await taskService.readTask(req,res);
    console.log(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId));
    if(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId)!=-1){
        return httpWarnObject(req,res,"task with this id already exists");
    }
    taskData[req.user.userName].push(req.body);
    await taskService.writeTask(req,res,taskData);
    httpSuccessObject(req,res,{message: "task was created successfully"});
}

const readAllTasks = async (req,res) => {
    const tasks = await taskService.readTask(req,res);
    const userTasks = tasks[req.user.userName];
    if(userTasks.length == 0){
        httpSuccessObject(req,res,{message : "there are no tasks to display"})
    }else{
        httpSuccessObject(req,res,userTasks);
    }
}

const readTaskById = async (req,res) => {
    const userTasks = await taskService.readTask(req,res);
    const tasks = userTasks[req.user.userName];
    if(validator.taskIdValidator(req.body.taskId) == false){
        return httpWarnObject(req,res,"invalid id");
    }
    let isTaskFound = false;
    let taskData = {};
    tasks.forEach(task => {
        if(task.taskId==req.body.taskId){
            taskData = task;
            isTaskFound = true;
        }
    });
    if(isTaskFound) return httpSuccessObject(req,res,taskData);
    httpSuccessObject(req,res,{message : "task not found"});
}

const updateTask = async (req,res) => {
    const taskData = await taskService.readTask(req,res);
    const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId);
    if(taskIndex==-1){
       return httpWarnObject(req,res,"task doesn't exists");
    }
    if(!validator.taskValidator(req.body)){
       return httpWarnObject(req,res,"tasks details are invalid");
    }
    taskData[req.user.userName][taskIndex] = req.body;
    await taskService.writeTask(req,res,taskData);
    httpSuccessObject(req,res,{message : "task was updated successfully"});
}

const deleteTask = async (req,res) => {
    if(validator.taskIdValidator(req.body.taskId) == false){
        return httpWarnObject(req,res,"invalid id");
    }
    const taskData = await taskService.readTask(req,res);
    const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId);
    if(taskIndex==-1){
        return httpWarnObject(req,res,"can't delete the task which doesn't exists");
    }
    taskData[req.user.userName].splice(taskIndex,1);
    await taskService.writeTask(req,res,taskData);
    httpSuccessObject(req,res,{message : "task was deleted successfully"});
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