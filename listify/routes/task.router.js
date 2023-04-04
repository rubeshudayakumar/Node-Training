const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.post("/create",taskController.createTask);

router.delete("/delete",taskController.deleteTask);

router.get("/filter",taskController.filterTask);

router.get("/read-by-id",taskController.readTaskById);

router.get("/read-all",taskController.readAllTasks);

router.get("/sort",taskController.sortTask);

router.put("/update",taskController.updateTask);

module.exports = router;