const fileRead = require("../services/FileRead.services").fileRead;
const fileWrite = require("../services/fileWrite.services").fileWrite;
const logger = require("../modules/Logger");

const addBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        fileData.push(req.body);
        await fileWrite(fileData);
        res.status(200).send({"message": "buddy detail added successfully!"});
    }catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : "some error occured!"});
    }
};

const updateBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        fileData.forEach((element,index,array) => {
            if(element.employeeId == id){
                array[index] = req.body;
            }
        });
        await fileWrite(fileData);
        res.status(200).send({"message": "data successfully updated"});
    }catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : "some error occured!"});
    }
}

const deleteBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        let index = 0;
        fileData.forEach((element,i,array) => {
            if(element.employeeId == id){
                index = i;
            }
        });
        fileData.splice(index,1);
        await fileWrite(fileData);
        res.status(200).send({"message" : "data deleted successfully"});
    }catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : "some error occured!"});
    }
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};