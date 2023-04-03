const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const FileIO = require("./utils/FileIO");
const addBuddy = require("./routes/addBuddy.router").router;
const updateBuddy = require("./routes/updateBuddy.router").router;
const deleteBuddy = require("./routes/deleteBuddy.router").router;
const listAllBuddies = require("./routes/listAllBuddies.router").router;
const getBuddy = require("./routes/getBuddy.router").router;

const corsOptions = {
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE",
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/add-buddy",addBuddy);
app.use("/update-buddy",updateBuddy);
app.use("/delete-buddy",deleteBuddy);
app.use("/list-all-buddies",listAllBuddies);
app.use("/get-buddy",getBuddy);

app.use("/",(req,res) => {
    res.send({"message": "invalid url path"});
})

app.listen(process.env.PORT, () => {
    if(!fs.existsSync("./data/cdw_ace23_buddies.json")){
        FileIO.createFile();
    }
    console.log(`listening on port number : ${process.env.PORT}`)
});