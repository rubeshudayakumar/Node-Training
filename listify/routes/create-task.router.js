const router = require("express").Router();
const createTaskController = require("../controllers/tasks-modify-controller").createTask;

router.post("/",createTaskController);

module.exports = router;