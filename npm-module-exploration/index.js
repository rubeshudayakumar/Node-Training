const http = require("http");
const fileIo = require("./modules/file-io");
// importing the third party random number
const rn = require('random-number');
const lodash = require("lodash");

http.createServer(async (req,res,err) => {
    // loading all the color palettes from the color_palette.json file
    const response = fileIo.loadJSONFile("./data/color_palette.json");
    // converting it to the json object
    const colorPalette =  JSON.parse(response);
    const colorsLength = colorPalette.length;

    const gen = rn.generator({
        min:  0, 
        max:  colorsLength,
        integer: true,
    });
    // selecting the random five colors from the json 
    let randomFiveColors = [];
    // using the third party package to get the random number 
    lodash.range(1,5).forEach(element => {
        randomFiveColors.push(colorPalette[gen()]);
    });
    
    // storing the 5 colors into the randomized_color_palette.json file
    fileIo.storeJSONFile(JSON.stringify(randomFiveColors));
    // loading from the randomized_color_palette.json and printing it to the console
    let fiveColorsFromFile = JSON.parse(await fileIo.loadJSONFile("./data/randomized_color_palette.json"));
    res.write(JSON.stringify(fiveColorsFromFile));
    res.end();
}).listen(4000);