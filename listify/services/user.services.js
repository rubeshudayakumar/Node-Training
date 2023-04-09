const fs = require("fs");
const { httpErrorObject } = require("../utils/responseObject");

const readUser = (req,res) => {
    return new Promise((resolve,reject) => {
        fs.readFile("./data/user_data.json","UTF-8",(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
        });
    });
}

const writeUser = (req,res,data) => {
    return new Promise((resolve,reject) => {
        try{
            fs.writeFile("./data/user_data.json",JSON.stringify(data),"UTF-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }
                else{
                    resolve(data);
                }
            });
        }
        catch(err){
            reject(err);
        }
    });
}

const isUserExists = (users,userName) => {
    for(var i=0;i<users.length;i++){
        if(users[i].userName==userName){
            return i;
        }
    }
    return -1;
}

module.exports = {
    readUser,
    writeUser,
    isUserExists,
}