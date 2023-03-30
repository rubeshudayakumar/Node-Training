const fileRead = require("../services/FileRead.services").fileRead;
const fileWrite = require("../services/fileWrite.services").fileWrite;
const logger = require("../utils/Logger");
const { validator } = require("../utils/validator");

const addBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        fileData.push(req.body);
        if(!validator(req.body)){
            return res.status(403).send({"message": "input details are invalid"});
        }
        await fileWrite(fileData);
        res.status(200).send({"message": "buddy detail added successfully!"});
    }catch(err){
        res.status(500).send({"error" : "some error occured!"});
    }
};

const updateBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            return res.status(403).send({"message": "invalid input"});
        }
        fileData.forEach((element,index,array) => {
            if(element.employeeId == id){
                array[index] = req.body;
            }
        });
        await fileWrite(fileData);
        res.status(200).send({"message": "data successfully updated"});
    }catch(err){
        res.status(500).send({"error" : "some error occured!"});
    }
}

const deleteBuddy = async (req,res,err) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            return res.status(403).send({"message": "invalid input"});
        }
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
        res.status(500).send({"error" : "some error occured!"});
    }
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};