const fs = require("fs");

const fileWrite = (data) => {   
    return new Promise((resolve,reject) => {
        fs.writeFile("./data/cdw_ace23_buddies.json",JSON.stringify(data),"utf-8",(err,data) => {
            if(err){
                logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
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