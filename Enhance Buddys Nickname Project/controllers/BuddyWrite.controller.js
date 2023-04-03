const fileRead = require("../services/FileRead.services").fileRead;
const fileWrite = require("../services/fileWrite.services").fileWrite;
const warnLogger = require("../utils/Logger").warnLogger;
const { validator } = require("../utils/validator");

const addBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead(req,res);
        fileData.push(req.body);
        if(!validator(req.body)){
            throw "Invalid input";
        }
        await fileWrite(req,res,fileData);
        res.status(200).send({"message": "buddy detail added successfully!"});
    }catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message": `${err}`});
    }
};

const updateBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead(req,res);
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            throw "Invalid input";
        }
        if(!validator(req.body)){
            throw "Invalid Input";
        }
        let isFound = false;
        fileData.forEach((element,index,array) => {
            if(element.employeeId == id){
                array[index] = req.body;
                isFound = true;
            }
        });
        if(isFound==false){
            throw "Buddy not found"
        }
        await fileWrite(req,res,fileData);
        res.status(200).send({"message": "data successfully updated"});
    }catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message": `${err}`});
    }
}

const deleteBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead(req,res);
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            throw "Invalid input";
        }
        let isFound = false;
        let index = 0;
        fileData.forEach((element,i,array) => {
            if(element.employeeId == id){
                index = i;
                isFound = true;
            }
        });
        if(isFound==false){
            throw "Buddy not found";
        }
        fileData.splice(index,1);
        await fileWrite(req,res,fileData);
        res.status(200).send({"message" : "data deleted successfully"});
    }catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : `${err}`});
    }
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};