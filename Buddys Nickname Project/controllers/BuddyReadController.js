const fileRead = require("../services/FileRead").fileRead;

const listAllBuddies = async (req,res) => {
    res.send(await fileRead());
};

const getBuddy = async (req,res) => {
    const fileData = await fileRead();
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return res.send({"message": "invalid id"});
    }
    let isFound = false;
    fileData.forEach(buddy => {
        if(buddy.employeeId == id){
            isFound = true;
            res.send(buddy);
        }
    });
    if(!isFound) res.send({"message":"buddy not found"});
}

module.exports = {
    listAllBuddies,
    getBuddy,
}