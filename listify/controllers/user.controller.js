const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const userService = require("../services/user.services");
const taskService = require("../services/task.services");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth").generateToken;
const saltRounds = 10;

const userLogin = async (req,res) => {
    try{
        if(!validator.userIdAndPasswordValidator(req.body)){
            throw new Error("username and passwords are invalid format");
        }
        const userData = await userService.readUser(req,res);
        const userIndex = validator.isUserExists(userData,req.body.userName);
        if(userIndex==-1){
            throw new Error("username incorrect!");
        }
        if(!await bcrypt.compare(req.body.password,userData[userIndex].password)){
            throw new Error("password incorrect");
        }
        const token = auth(req.body.userName);
        res.status(200).send({"token" : token});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
}

const userRegister = async (req,res) => {
    try{
        if(!validator.userIdAndPasswordValidator(req.body)){
            throw new Error("username and passwords are invalid format");
        }
        const userData = await userService.readUser(req,res);
        const userIndex = validator.isUserExists(userData,req.body.userName);
        if(userIndex!=-1){
            throw new Error("user already exists");
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        userData.push({userName: req.body.userName,password: hashedPassword});
        const tasksData = await taskService.readTask(req,res);
        tasksData[req.body.userName] = [];
        await taskService.writeTask(req,res,tasksData);
        await userService.writeUser(req,res,userData);
        const token = auth(req.body.userName);
        res.status(200).send({"token" : token});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : err.message});
    }
}

module.exports = {
    userLogin,
    userRegister,
}