const warnLogger = require("../utils/logger").warnLogger;
const validator = require("../utils/validator");
const userService = require("../services/user.services");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userLogin = (req,res) => {
    try{
        
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
        if(validator.isUserExists(userData,req.body.userName)){
            throw new Error("user already exists")
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        userData.push({userName: req.body.userName,password: hashedPassword});
        userService.writeUser(req,res,userData);
        res.status(200).send({"message" : "registration successful"});
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