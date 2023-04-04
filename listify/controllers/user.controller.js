const warnLogger = require("../utils/logger").warnLogger;
const userIdAndPasswordValidator = require("../utils/validator").userIdAndPasswordValidator;
const userService = require("../services/user.services");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userLogin = (req,res) => {
    res.send({"message": "login route"});
}

const userRegister = async (req,res) => {
    try{
        if(!userIdAndPasswordValidator(req.body)){
            throw new Error("username and passwords are invalid format");
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const userData = await userService.readUser(req,res);
        userData.push({userName: req.body.userName,password: hashedPassword});
        userService.writeUser(req,res,userData);
        res.status(200).send({"message" : "registration successful"});
    }
    catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message" : "username should contain alphabets or under score and password should be atleast 8 characters"});
    }
}

module.exports = {
    userLogin,
    userRegister,
}