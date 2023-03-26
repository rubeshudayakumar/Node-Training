const http = require("http");
const FileIO = require("./modules/FileIO");

http.createServer(async (req,res,err) => {
    // loading all the color palettes from the color_palette.json file
    let response = await FileIO.loadJSONFile("./data/color_ palette.json");
    // converting it to the json object
    let color_palette =  JSON.parse(response);
    let colorsLength = color_palette.length;
    // selecting the random five colors from the json 
    let randomFiveColors = [];
    let i = 1;
    while(i++<=5){
       randomFiveColors.push(color_palette[Math.floor(Math.random() * colorsLength)+1]);
    }
    // storing the 5 colors into the randomized_color_palette.json file
    FileIO.storeJSONFile(JSON.stringify(randomFiveColors));
    // loading from the randomized_color_palette.json and printing it to the console
    let fiveColorsFromFIle = JSON.parse(await FileIO.loadJSONFile("./data/randomized_color_ palette.json"));
    res.write(JSON.stringify(fiveColorsFromFIle));
    res.end();
}).listen(4000);
