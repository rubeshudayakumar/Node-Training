const fs = require("fs");
const errorLogger = require("../utils/logger").errorLogger;

const readTask = (req,res) => {
    return new Promise((resolve,reject) => {
        fs.readFile("./data/tasks_data.json","UTF-8",(err,data) => {
            if(err){
                errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                return res.status(500).send({message: "error in reading the file"});
            }else{
                resolve(JSON.parse(data));
            }
        });
    });
}

const writeTask = (req,res,data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile("./data/tasks_data.json",JSON.stringify(data),"UTF-8",(err,data) => {
            if(err){
                errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                return res.status(500).send({message: "error in reading the file"});
            }
            else{
                resolve(data);
            }
        });
    });
}

module.exports = {
    readTask,
    writeTask
}