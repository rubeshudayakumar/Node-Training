const fileRead = require("../services/FileRead").fileRead;
const fileWrite = require("../services/fileWrite").fileWrite;

const addBuddy = async (req,res,err) => {
    const fileData = await fileRead();
    fileData.push(req.body);
    await fileWrite(fileData);
    res.send({"message": "buddy detail added successfully!"});
};

const updateBuddy = async (req,res,err) => {
    const fileData = await fileRead();
    const id = req.params.id;
    fileData.forEach((element,index,array) => {
        if(element.employeeId == id){
            array[index] = req.body;
        }
    });
    await fileWrite(fileData);
    res.send({"message": "data successfully updated"});
}

const deleteBuddy = async (req,res,err) => {
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
    res.send({"message" : "data deleted successfully"});
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};