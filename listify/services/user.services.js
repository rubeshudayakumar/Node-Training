const fs = require("fs");
const { httpErrorObject } = require("../utils/responseObject");

const readUser = (req,res) => {
    return new Promise((resolve,reject) => {
        try{
            fs.readFile("./data/user_data.json","UTF-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }else{
                    resolve(JSON.parse(data));
                }
            });
        }
        catch(err){
            reject(err);
        }
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

module.exports = {
    readUser,
    writeUser,
}