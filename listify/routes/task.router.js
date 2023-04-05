const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const authentication = require("../middleware/auth").verifyToken;

router.post("/create",authentication,taskController.createTask);

router.get("/read-all",authentication,taskController.readAllTasks);

router.delete("/delete",authentication,taskController.deleteTask);

router.get("/filter",authentication,taskController.filterTask);

router.get("/read-by-id",authentication,taskController.readTaskById);

router.get("/sort",authentication,taskController.sortTask);

router.put("/update",authentication,taskController.updateTask);

module.exports = router;