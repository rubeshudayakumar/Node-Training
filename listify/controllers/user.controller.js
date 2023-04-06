const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const userService = require("../services/user.services");
const taskService = require("../services/task.services");
const bcrypt = require("bcrypt");
const { httpSuccessObject, httpWarnObject } = require("../utils/responseObject");
const auth = require("../middleware/auth").generateToken;
const saltRounds = 10;

const userLogin = async (req,res) => {
    if(!validator.userIdAndPasswordValidator(req.body)){
        return httpWarnObject(req,res,"username and passwords are invalid format");
    }
    const userData = await userService.readUser(req,res);
    const userIndex = validator.isUserExists(userData,req.body.userName);
    if(userIndex==-1){
        return httpWarnObject(req,res,"username incorrect!");
    }
    if(!await bcrypt.compare(req.body.password,userData[userIndex].password)){
        return httpWarnObject(req,res,"password incorrect");
    }
    const token = auth(req.body.userName);
    httpSuccessObject(req,res,{"token" : token});
}

const userRegister = async (req,res) => {
    if(!validator.userIdAndPasswordValidator(req.body)){
        return httpWarnObject(req,res,"username and passwords are invalid format");
    }
    const userData = await userService.readUser(req,res);
    const userIndex = validator.isUserExists(userData,req.body.userName);
    if(userIndex!=-1){
        return httpWarnObject(req,res,"user already exists");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    userData.push({userName: req.body.userName,password: hashedPassword});
    const tasksData = await taskService.readTask(req,res);
    tasksData[req.body.userName] = [];
    await taskService.writeTask(req,res,tasksData);
    await userService.writeUser(req,res,userData);
    const token = auth(req.body.userName);
    httpSuccessObject(req,res,{"token" : token});
}

module.exports = {
    userLogin,
    userRegister,
}