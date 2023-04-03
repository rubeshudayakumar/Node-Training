const fileRead = require("../services/FileRead.services").fileRead;
const warnLogger = require("../utils/Logger").warnLogger;

const listAllBuddies = async (req,res) => {
    try{
        res.status(200).send(await fileRead(req,res));

    }catch(err){
        res.status(500).send({"error" : "some error occured!"});
    }
};

const getBuddy = async (req,res) => {
    try{
        const fileData = await fileRead(req,res);
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            throw "Invalid input";
        }
        let isFound = false;
        fileData.forEach(buddy => {
            if(buddy.employeeId == id){
                isFound = true;
                res.status(200).send(buddy);
            }
        });
        if(!isFound) res.send({"message":"buddy not found"});
    }catch(err){
        warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).send({"message": "input details are invalid"});
    }
}

module.exports = {
    listAllBuddies,
    getBuddy,
}