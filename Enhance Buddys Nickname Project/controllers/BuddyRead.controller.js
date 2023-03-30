const fileRead = require("../services/FileRead.services").fileRead;
const logger = require("../modules/Logger");

const listAllBuddies = async (req,res) => {
    try{
        res.status(200).send(await fileRead());
    }catch(err){
        logger.warn(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : "some error occured!"});
    }
};

const getBuddy = async (req,res) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        let isFound = false;
        fileData.forEach(buddy => {
            if(buddy.employeeId == id){
                isFound = true;
                res.status(200).send(buddy);
            }
        });
        if(!isFound) res.send({"message":"buddy not found"});
    }catch(err){
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({"error" : "some error occured!"});
    }
}

module.exports = {
    listAllBuddies,
    getBuddy,
}