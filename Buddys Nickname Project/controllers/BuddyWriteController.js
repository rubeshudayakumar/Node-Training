const fileRead = require("../services/FileRead").fileRead;
const fileWrite = require("../services/fileWrite").fileWrite;
const validator = require("../utils/validator").validator;
const responseMessage = require("../utils/constants");

const addBuddy = async (req,res,err) => {
    const fileData = await fileRead();
    if(!validator(req.body)) return res.send({message : responseMessage.INVALID_INPUTS});
    fileData.push(req.body);
    await fileWrite(fileData);
    res.send({message: responseMessage.BUDDY_ADDED_SUCCESSFULLY});
};

const updateBuddy = async (req,res,err) => {
    const fileData = await fileRead();
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return res.send({message: responseMessage.INVALID_ID});
    }
    if(!validator(req.body)) return res.send({message : responseMessage.INVALID_INPUTS});
    fileData.forEach((element,index,array) => {
        if(element.employeeId == id){
            array[index] = req.body;
        }
    });
    await fileWrite(fileData);
    res.send({message: responseMessage.BUDDY_UPDATED});
}

const deleteBuddy = async (req,res,err) => {
    const fileData = await fileRead();
    const id = req.params.id;
    if((/^[0-9]{1,30}$/).test(id)==false){
        return res.send({message : responseMessage.INVALID_ID});
    }
    let index = 0;
    fileData.forEach((element,i,array) => {
        if(element.employeeId == id){
            index = i;
        }
    });
    fileData.splice(index,1);
    await fileWrite(fileData);
    res.send({message : responseMessage.BUDDY_DELETED});
}

module.exports = {
    addBuddy,
    updateBuddy,
    deleteBuddy
};