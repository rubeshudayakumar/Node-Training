const fileIo = require("./modules/file-io");

const displayRandomColors =  () => {
   let response = "";
   const filePaths = [
      "./data/color_palette.json",
      "./data/randomized_color_palette.json",
   ];
   let randomFiveColors = [];

   // loading all the color palettes from the color_palette.json file
   const readFile = () =>  {
      try{
         response = fileIo.loadFile(filePaths[0]);
         if(response.length==0){
            throw new Error("file is empty");
         }
         return true;
      }
      catch(err){
         console.log(err.message);
         return false;
      }
   }
   const isRead = readFile();
   if(!isRead) return;
   
   const generateRandomColors = () => {
      try{
         let insertedRandoms = [];         
          // converting it to the json object
         const colorPalette =  JSON.parse(response);
         if(colorPalette.length<5){
            throw new Error("there are not enough available colors");
         }
         const colorsLength = colorPalette.length;
         // selecting the random five colors from the json 
         let i = 1;
         while(i<=5){
            const randomNumber = Math.floor(Math.random() * colorsLength);
            if(insertedRandoms.indexOf(randomNumber)==-1){
               randomFiveColors.push(colorPalette[randomNumber]);
               insertedRandoms.push(randomNumber);
               i++;
               continue;
            }
         }
         if(randomFiveColors.length<5){
            throw new Error("Couldn't able to get random 5 colors");
         }
         return true;
      }
      catch(err){
         console.log(err.message);
         return false;
      }
   }
   const isGotFiveColors = generateRandomColors();
   if(!isGotFiveColors) return;
   
   const storeAndDisplayColors = () => {
      try{
         // storing the 5 colors into the randomized_color_palette.json file
         fileIo.storeFile(filePaths[1],JSON.stringify(randomFiveColors));
         // loading from the randomized_color_palette.json and printing it to the console
         const fiveColorsFromFIle = JSON.parse(fileIo.loadFile(filePaths[1]));
         console.log(fiveColorsFromFIle);
      }
      catch(err){
         console.log(err.message);
      }  
   }
   storeAndDisplayColors();
}

displayRandomColors();


