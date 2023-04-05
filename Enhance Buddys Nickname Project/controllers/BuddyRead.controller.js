const fileRead = require("../services/FileRead.services").fileRead;
const warnLogger = require("../utils/Logger").warnLogger;
const {httpSuccessObject,httpWarnObject} = require("../utils/responseObject");

const listAllBuddies = async (req,res) => {
    const data = await fileRead(req,res);
    if(data) httpSuccessObject(req,res,data);
};

const getBuddy = async (req,res) => {
    const fileData = await fileRead(req,res);
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return httpWarnObject(req,res,"Invalid input");
    }
    let isFound = false;
    fileData.forEach(buddy => {
        if(buddy.employeeId == id){
            isFound = true;
            httpSuccessObject(req,res,buddy);
        }
    });
    if(!isFound) httpSuccessObject(req,res,{"message":"buddy not found"});
}

module.exports = {
    listAllBuddies,
    getBuddy,
}