const fileRead = require("../services/FileRead.services").fileRead;
const logger = require("../utils/Logger");

const listAllBuddies = async (req,res) => {
    try{
        res.status(200).send(await fileRead());
    }catch(err){
        res.status(500).send({"error" : "some error occured!"});
    }
};

const getBuddy = async (req,res) => {
    try{
        const fileData = await fileRead();
        const id = req.params.id;
        if((/^[0-9]{1,30}$/).test(id)==false){
            return res.status(403).send({"message": "invalid input"});
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
        res.status(500).send({"error" : "some error occured!"});
    }
}

module.exports = {
    listAllBuddies,
    getBuddy,
}