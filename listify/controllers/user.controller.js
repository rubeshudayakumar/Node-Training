const warnLogger = require("../utils/logger").warnLogger;
const userIdAndPasswordValidator = require("../utils/validator").userIdAndPasswordValidator;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userLogin = (req,res) => {
    res.send({"message": "login route"});
}

const userRegister = async (req,res) => {
  
        res.status(200).send({"message" : "registration successful"});
}

module.exports = {
    userLogin,
    userRegister,
}