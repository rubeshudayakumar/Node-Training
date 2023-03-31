const fileIo = require("./modules/file-io");

const displayRandomColors =  () => {
   const filePaths = [
      "./data/color_ palette.json",
      "./data/randomized_color_ palette.json",
   ];
   // loading all the color palettes from the color_palette.json file
   const response = "";
   try{
      response = fileIo.loadFile(filePaths[0]);
   }
   catch{
      console.log("error in opening the file");
      return;
   }
   
   if(response==""){
      console.log("file is empty");
      return;
   }
   console.log(response)
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
   fileIo.storeFile(filePaths[1],JSON.stringify(randomFiveColors));
   // loading from the randomized_color_palette.json and printing it to the console
   const fiveColorsFromFIle = JSON.parse(fileIo.loadFile(filePaths[1]));
   console.log(fiveColorsFromFIle);
}

displayRandomColors();


