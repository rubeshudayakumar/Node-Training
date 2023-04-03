const router = require("express").Router();
const readAllTasksController = require("../controllers/tasks-read-controller").readAllTasks;

router.get("/",readAllTasksController);

module.exports = router;