const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const FileIO = require("./utils/FileIO");
const buddyRouter = require("./routes/buddy.router");

const corsOptions = {
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE",
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/buddy",buddyRouter);

app.use("/",(req,res) => {
    res.send({"message": "invalid url path"});
})

app.listen(process.env.PORT, () => {
    if(!fs.existsSync("./data/cdw_ace23_buddies.json")){
        FileIO.createFile();
    }
    console.log(`listening on port number : ${process.env.PORT}`)
});