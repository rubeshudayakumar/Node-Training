const fs = require("fs");

const fileWrite = (data) => {   
    return new Promise((resolve,reject) => {
        fs.writeFile("./data/cdw_ace23_buddies.json",JSON.stringify(data),"utf-8",(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

module.exports = {
    fileWrite,
};