const http = require("http");
const fileIo = require("./modules/file-io");

http.createServer((req,res,err) => {
    let response;
    let randomFiveColors = [];
    let fiveColorsFromFIle;

    function loadData() {
        // loading all the color palettes from the color_palette.json file
        try{
            response = fileIo.loadJSONFile("./data/color_ palette.json");
            if(response==undefined || response==null){
                throw "Some error";
            }
        }
        catch(err){
            res.write("some error occured!");
            res.end();
            return;
        }
    }

    loadData();

    function getRandomFiveColors() {
        // converting it to the json object
        let colorPalette =  JSON.parse(response);
        let colorsLength = colorPalette.length;
        // selecting the random five colors from the json 
        
        let i = 1;
        while(i++<=5){
        randomFiveColors.push(colorPalette[Math.floor(Math.random() * colorsLength)+1]);
        }
        if(randomFiveColors.length<5){
            res.write("error in generating the random colors!");
            res.end();
            return;
        }
    }

    getRandomFiveColors();
    
    
    function storeData(){
        // storing the 5 colors into the randomized_color_palette.json file
        try{
            fileIo.storeJSONFile(JSON.stringify(randomFiveColors));
        }
        catch{
            res.write("some error occured!");
            res.end();
            return;
        }
        // loading from the randomized_color_palette.json and printing it to the console
        
        try{
            fiveColorsFromFIle = JSON.parse(fileIo.loadJSONFile("./data/randomized_color_ palette.json"));
        }
        catch(err){
            res.write("some error occured!");
            res.end();
            return;
        }
    }

    storeData();
    res.write(JSON.stringify(fiveColorsFromFIle));
    res.end();
}).listen(4000);
