const warnLogger = require("../utils/logger").warnLogger;

const readTaskById = (req,res) => {
    res.send({"message" : "read tasks by id router"});
}

const readAllTasks = (req,res) => {
    res.send({"message" : "read all tasks route"});
}

module.exports = {
    readTaskById,
    readAllTasks,
}