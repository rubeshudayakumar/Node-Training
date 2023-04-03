const router = require("express").Router();
const updateTaskController = require("../controllers/tasks-modify-controller").updateTask;

router.put("/",updateTaskController);

module.exports = router;