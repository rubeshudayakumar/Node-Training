const fs = require("fs");

const fileRead = () => {
    return new Promise((resolve,reject) => {
        fs.readFile("./data/cdw_ace23_buddies.json","utf-8",(err,data) => {
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        })
    });
}

module.exports = {
    fileRead
}