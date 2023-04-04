const express = require("express");
const app = express();
const cors = require("cors");

const createTaskRouter = require("./routes/create-task.router");
const deleteTaskRouter = require("./routes/delete-task.router");
const filterTasksRouter = require("./routes/filter-tasks.router");
const loginRouter = require("./routes/login.router");
const readTaskByIdRouter = require("./routes/read-task-by-id.router");
const readAllTasksRouter = require("./routes/read-tasks.router");
const userRegisterRouter = require("./routes/register.router");
const sortTaskRouter = require("./routes/sort-tasks.router");
const updateTaskRouter = require("./routes/update-task.router");

const corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/create-task",createTaskRouter);
app.use("/delete-task",deleteTaskRouter);
app.use("/filter-tasks",filterTasksRouter);
app.use("/user-login",loginRouter);
app.use("/read-task-by-id",readTaskByIdRouter);
app.use("/read-all-tasks",readAllTasksRouter);
app.use("/user-register",userRegisterRouter);
app.use("/sort-tasks",sortTaskRouter);
app.use("/update-task",updateTaskRouter);

app.use("/",(req,res) => {
    res.status(404).send({"message":"couldn't display the requested page"})
});

app.listen(4000,() => {
    console.log("listening in port number : "+4000);
});