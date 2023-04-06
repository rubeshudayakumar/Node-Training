const fileRead = require("../services/FileRead").fileRead;
const responseMessage = require("../utils/constants");

const listAllBuddies = async (req,res) => {
    res.send(await fileRead());
};

const getBuddy = async (req,res) => {
    const fileData = await fileRead();
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return res.send({message: responseMessage.INVALID_ID});
    }
    let isFound = false;
    fileData.forEach(buddy => {
        if(buddy.employeeId == id){
            isFound = true;
            res.send(buddy);
        }
    });
    if(!isFound) res.send({message: responseMessage.BUDDY_NOT_FOUND});
}

module.exports = {
    listAllBuddies,
    getBuddy,
}