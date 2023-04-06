const router = require("express").Router();
const taskController = require("../controllers/task.controller");

router.post("/",taskController.createTask);

router.delete("/:id",taskController.deleteTask);

router.get("/filter",taskController.filterTask);

router.get("/:id",taskController.readTaskById);

router.get("/",taskController.readAllTasks);

router.get("/sort",taskController.sortTask);

router.put("/",taskController.updateTask);

module.exports = router;