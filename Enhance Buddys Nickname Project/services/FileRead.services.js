const fs = require("fs");
const {httpErrorObject} = require("../utils/responseObject");
const path = "./data/cdw_ace23_buddies.json";

const fileRead = (req,res) => {
    return new Promise((resolve,reject) => {
        try{
            fs.readFile(path,"utf-8",(err,data) => {
                if(err){
                    httpErrorObject(req,res,err);
                }
                else{
                    resolve(JSON.parse(data));
                }
            })
        }
        catch(err){
            reject(err);
        }
    });
}

module.exports = {
    fileRead
}