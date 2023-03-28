const fileRead = require("../services/FileRead").fileRead;

const listAllBuddies = async (req,res) => {
    res.send(await fileRead());
};

const getBuddy = async (req,res) => {
    const fileData = await fileRead();
    const id = req.params.id;
    fileData.forEach(buddy => {
        if(buddy.employeeId == id){
            res.send(buddy);
            return;
        }
    });
    res.send({"message":"buddy not found"});
}

module.exports = {
    listAllBuddies,
    getBuddy,
}