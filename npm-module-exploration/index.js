const http = require("http");
const FileIO = require("./modules/FileIO");
// importing the third party random number
const rn = require('random-number');

http.createServer(async (req,res,err) => {
    // loading all the color palettes from the color_palette.json file
    const response = FileIO.loadJSONFile("./data/color_palette.json");
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
    let counter = 1;
    while(counter++<=5){
        // using the third party package to get the random number 
       randomFiveColors.push(colorPalette[gen()]);
    }
    // storing the 5 colors into the randomized_color_palette.json file
    FileIO.storeJSONFile(JSON.stringify(randomFiveColors));
    // loading from the randomized_color_palette.json and printing it to the console
    let fiveColorsFromFile = JSON.parse(await FileIO.loadJSONFile("./data/randomized_color_palette.json"));
    res.write(JSON.stringify(fiveColorsFromFile));
    res.end();
}).listen(4000);