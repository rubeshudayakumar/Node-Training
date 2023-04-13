const validator = require("../utils/validator");
const taskService = require("../services/task.services");
const {httpSuccessObject, httpWarnObject,httpErrorObject} = require("../utils/responseObject");
const constants = require("../utils/constants");

const sendResponse = (res,response) => {
    res.status(response.status).send(response.data);
}

const createTask = async (req,res) => {
    let response;
    try{
        if(!validator.taskValidator(req.body)){
            response =  httpWarnObject(req,constants.TASK_DETAILS_INVALID);
            return sendResponse(res,response);
        }
        const taskData = await taskService.readTask(req,res);
        console.log(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId));
        if(validator.checkIfTaskExists(taskData[req.user.userName],req.body.taskId)!=-1){
            response =  httpWarnObject(req,res,constants.TASK_ID_ALREADY_EXISTS);
            return sendResponse(res,response);
        }
        taskData[req.user.userName].push(req.body);
        await taskService.writeTask(req,res,taskData);
        response = httpSuccessObject({message: constants.TASK_CREATED_SUCCESSFULLY});
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
            response = httpSuccessObject({message : constants.NO_TASKS_TO_DISPLAY})
            sendResponse(res,response);
        }else{
            response = httpSuccessObject({data : userTasks});
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
            response =  httpWarnObject(req,constants.INVALID_ID);
            return sendResponse(res,response);
        }
        let [taskIsfound,taskData] = validator.findTask(req.params.id,tasks);
        if(taskIsfound) {
            response = httpSuccessObject(taskData);
            sendResponse(res,response);
        }else{
            response = httpSuccessObject({message : constants.TASK_NOT_FOUND});
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
            response = httpWarnObject(req,constants.TASK_NOT_EXISTS);
            return sendResponse(res,response);
        }
        if(!validator.taskValidator(req.body)){
            response = httpWarnObject(req,constants.TASK_DETAILS_INVALID);
            return sendResponse(res,response);
        }
        taskData[req.user.userName][taskIndex] = req.body;
        await taskService.writeTask(req,res,taskData);
        response = httpSuccessObject({message : constants.TASK_UPDATED});
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
            response = httpWarnObject(req,constants.INVALID_ID);
            return sendResponse(res,response);
        }
        const taskData = await taskService.readTask(req,res);
        const taskIndex = validator.checkIfTaskExists(taskData[req.user.userName],req.params.id);
        if(taskIndex==-1){
            response = httpWarnObject(req,constants.TASK_UNABLE_TO_DELETE_NON_EXISTING_TASK);
            return sendResponse(res,response);
        }
        taskData[req.user.userName].splice(taskIndex,1);
        await taskService.writeTask(req,res,taskData);
        response = httpSuccessObject({message : constants.TASK_DELETED});
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
        if(!(options.includes(req.query.option))){
            response = httpWarnObject(req,constants.INVALID_OPTION);
            return sendResponse(res,response);
        }
        let computedTasks = [];
        const tasks = await taskService.readTask(req,res);
        const userTasks = tasks[req.user.userName];
        if(req.query.action == "sort"){
            computedTasks = userTasks.sort((taskA,taskB) => taskA[req.query.option].localeCompare(taskB[req.query.option]));
        }
        else if(req.query.action == "filter"){
            computedTasks = userTasks.filter((task) => task[req.query.option] == req.query.value);
        }
        else{
            response = httpWarnObject(req,constants.INVALID_OPTION);
            return sendResponse(res,response);
        }
        const tasksPerPage = req.query.size;
        const startIndex = (req.query.page - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
        const page = computedTasks.slice(startIndex, endIndex);
        const response = httpSuccessObject({data : page});
        sendResponse(res,response);
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