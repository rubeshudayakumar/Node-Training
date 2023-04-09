const validator = require("../utils/validator");
const userService = require("../services/user.services");
const taskService = require("../services/task.services");
const bcrypt = require("bcrypt");
const { httpSuccessObject, httpWarnObject, httpErrorObject } = require("../utils/responseObject");
const auth = require("../middleware/auth").generateToken;
const saltRounds = 10;

const sendResponse = (res,response) => {
    res.status(response.status).send(response.data);
}

const userLogin = async (req,res) => {
    let response;
    try{
        if(!validator.userIdAndPasswordValidator(req.body)){
            response = httpWarnObject(req,"username and passwords are invalid format");
            return sendResponse(res,response);
        }
        const userData = await userService.readUser(req,res);
        const userIndex =  userService.isUserExists(userData,req.body.userName);
        if(userIndex==-1){
            response =  httpWarnObject(req,"username incorrect!");
            return sendResponse(res,response);
        }
        if(!await bcrypt.compare(req.body.password,userData[userIndex].password)){
            response =  httpWarnObject(req,"password incorrect");
            return sendResponse(res,response);
        }
        const token = auth(req.body.userName);
        response = httpSuccessObject({token : token});
        sendResponse(res,response);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

const userRegister = async (req,res) => {
    let response;
    try{
        if(!validator.userIdAndPasswordValidator(req.body)){
            response = httpWarnObject(req,"username and passwords are invalid format");
            return sendResponse(res,response);
        }
        const userData = await userService.readUser(req,res);
        const userIndex = userService.isUserExists(userData,req.body.userName);
        if(userIndex!=-1){
            response = httpWarnObject(req,"user already exists");
            return sendResponse(res,response);
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        userData.push({userName: req.body.userName,password: hashedPassword});
        const tasksData = await taskService.readTask(req,res);
        tasksData[req.body.userName] = [];
        await taskService.writeTask(req,res,tasksData);
        await userService.writeUser(req,res,userData);
        const token = auth(req.body.userName);
        response = httpSuccessObject({token : token});
        sendResponse(res,response);
    }
    catch(err){
        response = httpErrorObject(req,err.message);
        sendResponse(res,response);
    }
}

module.exports = {
    userLogin,
    userRegister,
}