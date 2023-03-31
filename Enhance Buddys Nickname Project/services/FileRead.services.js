const fs = require("fs");
const errorLogger = require("../utils/Logger").errorLogger;

const fileRead = (req,res) => {
    return new Promise((resolve,reject) => {
        fs.readFile("./data/cdw_ace23_buddies.json","utf-8",(err,data) => {
            if(err){
                errorLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
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