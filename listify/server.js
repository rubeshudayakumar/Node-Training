const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

const userRouter = require("./routes/user.router");
const taskRouter = require("./routes/task.router");

const corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/users",userRouter);
app.use("/tasks",taskRouter);

app.use("/",(req,res) => {
    res.status(404).send({"message":"couldn't display the requested page"});
});

app.listen(4000,() => {
    if(!fs.existsSync("./data/user_data.json")){
        fs.writeFileSync("./data/user_data.json","[]","UTF-8");
    }
    if(!fs.existsSync("./data/tasks_data.json")){
        fs.writeFileSync("./data/tasks_data.json","{}","UTF-8");
    }
    console.log("listening in port number : "+4000);
});