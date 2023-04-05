const fs = require("fs");
const errorLogger = require("../utils/Logger").errorLogger;

const path = "./data/cdw_ace23_buddies.json";

const fileRead = (req,res) => {
    return new Promise((resolve,reject) => {
        fs.readFile(path,"utf-8",(err,data) => {
            if(err){
                errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        })
    });
}

module.exports = {
    fileRead
}