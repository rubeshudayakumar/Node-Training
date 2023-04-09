const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const authentication = require("../middleware/auth").verifyToken;

router.post("/",authentication,taskController.createTask);

router.get("/tasks-list",authentication,taskController.readAllTasks);

router.delete("/:id",authentication,taskController.deleteTask);

router.get("/:id",authentication,taskController.readTaskById);

router.post("/tasks-get",authentication,taskController.getTask);

router.put("/:id",authentication,taskController.updateTask);

module.exports = router;