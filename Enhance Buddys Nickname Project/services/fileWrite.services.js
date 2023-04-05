const fs = require("fs");
const {httpErrorObject} = require("../utils/responseObject");
const path = "./data/cdw_ace23_buddies.json";

const fileWrite = (req,res,data) => {   
    return new Promise((resolve,reject) => {
        try{
            fs.writeFile(path,JSON.stringify(data),"utf-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }else{
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
    fileWrite,
};