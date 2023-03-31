const fs = require("fs");

exports.loadFile = (fileUrl) => {
    let data = fs.readFileSync(fileUrl,"utf-8");
    return data;
}

exports.storeFile = (fileUrl,data) => {
    fs.writeFileSync(fileUrl,data,"utf-8");
}