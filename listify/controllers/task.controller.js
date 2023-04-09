const validator = require("../utils/validator");
const taskService = require("../services/task.services");
const {httpSuccessObject, httpWarnObject} = require("../utils/responseObject");

const sendResponse = (res,response) => {
    res.status(response.status).send(response.data);
}

const createTask = async (req,res) => {
    let response;
    try{
        if(!validator.taskValidator(req.body)){
            response =  httpWarnObject(req,"tasks details are invalid");
            return sendResponse(res,response);
        }
        const taskData = await taskService.readTask(req,res);
        console.log(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId));
        if(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId)!=-1){
            response =  httpWarnObject(req,res,"task with this id already exists");
            return sendResponse(res,response);
        }
        taskData[req.user.userName].push(req.body);
        await taskService.writeTask(req,res,taskData);
        response = httpSuccessObject({message: "task was created successfully"});
        sendResponse(res,response);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const readAllTasks = async (req,res) => {
    let response;
    try{
        const tasks = await taskService.readTask(req,res);
        const userTasks = tasks[req.user.userName];
        if(userTasks.length == 0){
            response = httpSuccessObject({message : "there are no tasks to display"})
            sendResponse(res,response);
        }else{
            response = httpSuccessObject(userTasks);
            sendResponse(res,response);
        }
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const readTaskById = async (req,res) => {
    let response;
    try{
        const userTasks = await taskService.readTask(req,res);
        const tasks = userTasks[req.user.userName];
        if(validator.taskIdValidator(req.params.id) == false){
            response =  httpWarnObject(req,"invalid id");
            return sendResponse(res,response);
        }
        let isTaskFound = false;
        let taskData = {};
        tasks.forEach(task => {
            if(task.taskId==req.params.id){
                taskData = task;
                isTaskFound = true;
            }
        });
        if(isTaskFound) {
            response = httpSuccessObject(taskData);
            sendResponse(res,response);
        }else{
            response = httpSuccessObject({message : "task not found"});
            sendResponse(res,response);
        }
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const updateTask = async (req,res) => {
    let response;
    try{
        const taskData = await taskService.readTask(req,res);
        const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.params.id);
        if(taskIndex==-1){
            response = httpWarnObject(req,"task doesn't exists");
            return sendResponse(res,response);
        }
        if(!validator.taskValidator(req.body)){
            response = httpWarnObject(req,"tasks details are invalid");
            return sendResponse(res,response);
        }
        taskData[req.user.userName][taskIndex] = req.body;
        await taskService.writeTask(req,res,taskData);
        response = httpSuccessObject({message : "task was updated successfully"});
        sendResponse(res,response);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const deleteTask = async (req,res) => {
    let response;
    try{
        if(validator.taskIdValidator(req.params.id) == false){
            response = httpWarnObject(req,"invalid id");
            return sendResponse(res,response);
        }
        const taskData = await taskService.readTask(req,res);
        const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.params.id);
        if(taskIndex==-1){
            response = httpWarnObject(req,res,"can't delete the task which doesn't exists");
            return sendResponse(res,response);
        }
        taskData[req.user.userName].splice(taskIndex,1);
        await taskService.writeTask(req,res,taskData);
        httpSuccessObject({message : "task was deleted successfully"});
        sendResponse(res,response);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const getTask = async (req,res) => {
    let response;
    try{
        const options = ["title","priority","dueDate"];
        if(!(options.includes(req.body.option))){
            response = httpWarnObject(req,"invalid option");
            return sendResponse(res,response);
        }
        let computedTasks = [];
        const tasks = await taskService.readTask(req,res);
        const userTasks = tasks[req.user.userName];
        if(req.body.action == "sort"){
            computedTasks = userTasks.sort((taskA,taskB) => taskA[req.body.option].localeCompare(taskB[req.body.option]));
        }
        else if(req.body.action == "filter"){
            computedTasks = userTasks.filter((task) => task[req.body.option] == req.body.value);
        }
        else{
            response = httpWarnObject(req,"invalid option");
            return sendResponse(res,response);
        }
        const tasksPerPage = req.query.size;
        const startIndex = (req.query.page - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
        const page = computedTasks.slice(startIndex, endIndex);
        httpSuccessObject(page);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

module.exports = {
    createTask,
    deleteTask,
    updateTask,
    readTaskById,
    readAllTasks,
    getTask,
}