const http = require("http");
const FileIO = require("./modules/FileIO");
// importing the third party random number
const rn = require('random-number');

http.createServer(async (req,res,err) => {
    // loading all the color palettes from the color_palette.json file
    let response = await FileIO.loadJSONFile("./data/color_palette.json");
    // converting it to the json object
    let color_palette =  JSON.parse(response);
    let colorsLength = color_palette.length;
    
    var gen = rn.generator({
        min:  0, 
        max:  colorsLength,
        integer: true,
    });
    // selecting the random five colors from the json 
    let randomFiveColors = [];
    let i = 1;
    while(i++<=5){
        // using the third party package to get the random number 
       randomFiveColors.push(color_palette[gen()]);
    }
    // storing the 5 colors into the randomized_color_palette.json file
    FileIO.storeJSONFile(JSON.stringify(randomFiveColors));
    // loading from the randomized_color_palette.json and printing it to the console
    let fiveColorsFromFIle = JSON.parse(await FileIO.loadJSONFile("./data/randomized_color_ palette.json"));
    res.write(JSON.stringify(fiveColorsFromFIle));
    res.end();
}).listen(4000);