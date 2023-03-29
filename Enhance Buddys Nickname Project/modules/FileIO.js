const fs = require("fs");

const createFile = () => {
    fs.writeFileSync("./data/cdw_ace23_buddies.json","[]","utf-8");
}

module.exports = {
    createFile,
}