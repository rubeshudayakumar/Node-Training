const fileRead = require("../services/FileRead.services").fileRead;
const fileWrite = require("../services/fileWrite.services").fileWrite;
const warnLogger = require("../utils/Logger").warnLogger;
const {httpSuccessObject,httpWarnObject} = require("../utils/responseObject");
const { validator,checkIfEmployeeExists,idValidator } = require("../utils/validator");

const addBuddy = async (req,res,err) => {
        const fileData = await fileRead(req,res);
        if(!validator(req.body)){
            return httpWarnObject(req,res,"Invalid input");
        } 
        if(checkIfEmployeeExists(fileData,req.body.employeeId)==true){
            return httpWarnObject(req,res,"Employee exists");
        }
        fileData.push(req.body);
        await fileWrite(req,res,fileData);
        httpSuccessObject(req,res,{"message": "buddy detail added successfully!"});
};

const updateBuddy = async (req,res,err) => {
    const fileData = await fileRead(req,res);
    const id = req.params.id;
    if(!idValidator(id,req.body.employeeId) || !validator(req.body)){
        return httpWarnObject(req,res,"Invalid inputs");
    }
    let isFound = false;
    fileData.forEach((element,index,array) => {
        if(element.employeeId == id){
            array[index] = req.body;
            isFound = true;
        }
    });
    if(isFound==false){
        return httpWarnObject(req,res,"Buddy not found")
    }
    await fileWrite(req,res,fileData);
    httpSuccessObject(req,res,{"message": "data successfully updated"});
}

const deleteBuddy = async (req,res,err) => {
    const fileData = await fileRead(req,res);
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return httpWarnObject(req,res,"Invalid id");
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
        return httpWarnObject(req,res,"Buddy not found");
    }
    fileData.splice(index,1);
    await fileWrite(req,res,fileData);
    httpSuccessObject(req,res,{"message" : "data deleted successfully"});
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};