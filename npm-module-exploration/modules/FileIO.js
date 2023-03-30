const fs = require("fs");

exports.loadJSONFile = (fileUrl) => {
    const data = fs.readFileSync(fileUrl,"utf-8",(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("data loaded");
        }
    });
    return data;
}

exports.storeJSONFile = (data) => {
    fs.writeFileSync("./data/randomized_color_palette.json",data,"utf-8");
}