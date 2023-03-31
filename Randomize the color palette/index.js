const fileIo = require("./modules/file-io");

const displayRandomColors =  () => {
     // loading all the color palettes from the color_palette.json file
     const response = fileIo.loadFile("./data/color_ palette.json");
     // converting it to the json object
     const colorPalette =  JSON.parse(response);
     const colorsLength = colorPalette.length;
     // selecting the random five colors from the json 
     let randomFiveColors = [];
     let i = 1;
     while(i++<=5){
        randomFiveColors.push(colorPalette[Math.floor(Math.random() * colorsLength)+1]);
     }
     // storing the 5 colors into the randomized_color_palette.json file
     fileIo.storeFile("./data/randomized_color_ palette.json",JSON.stringify(randomFiveColors));
     // loading from the randomized_color_palette.json and printing it to the console
     const fiveColorsFromFIle = JSON.parse(fileIo.loadFile("./data/randomized_color_ palette.json"));
     console.log(fiveColorsFromFIle);
}

displayRandomColors();


