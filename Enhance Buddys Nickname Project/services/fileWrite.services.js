const fs = require("fs");
const errorLogger = require("../utils/Logger").errorLogger;

const path = "./data/cdw_ace23_buddies.json";

const fileWrite = (req,res,data) => {   
    return new Promise((resolve,reject) => {
        fs.writeFile(path,JSON.stringify(data),"utf-8",(err,data) => {
            if(err){
                errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

module.exports = {
    fileWrite,
};