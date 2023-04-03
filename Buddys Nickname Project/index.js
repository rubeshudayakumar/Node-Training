const express = require("express");
const app = express();
const fs = require("fs");

const FileIO = require("./utils/FileIO");

const addBuddy = require("./routes/addBuddyRouter").router;
const updateBuddy = require("./routes/updateBuddyRouter").router;
const deleteBuddy = require("./routes/deleteBuddyRouter").router;
const listAllBuddies = require("./routes/listAllBuddiesRouter").router;
const getBuddy = require("./routes/getBuddyRouter").router;

const port = 4000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/add-buddy",addBuddy);
app.use("/update-buddy",updateBuddy);
app.use("/delete-buddy",deleteBuddy);
app.use("/list-all-buddies",listAllBuddies);
app.use("/get-buddy",getBuddy);

app.listen(port, () => {
    if(!fs.existsSync("./data/cdw_ace23_buddies.json")){
        FileIO.createFile();
    }
    console.log(`listening on port number : ${port}`)
});