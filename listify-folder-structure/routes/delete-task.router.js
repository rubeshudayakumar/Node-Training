const router = require("express").Router();
const deleteTaskController = require("../controllers/tasks-modify-controller").deleteTask;

router.delete("/",deleteTaskController);

module.exports = router;