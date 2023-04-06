const fs = require("fs");
const { httpErrorObject } = require("../utils/responseObject");

const readTask = (req,res) => {
    return new Promise((resolve,reject) => {
        try{
            fs.readFile("./data/tasks_data.json","UTF-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }else{
                    resolve(JSON.parse(data));
                }
            });
        }
        catch(err){
            reject(err);
        }
    });
}

const writeTask = (req,res,data) => {
    return new Promise((resolve,reject) => {
        try{
            fs.writeFile("./data/tasks_data.json",JSON.stringify(data),"UTF-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }
                else{
                    resolve(data);
                }
            });
        }
        catch(err){
            reject(err);
        }
    });
}

module.exports = {
    readTask,
    writeTask
}