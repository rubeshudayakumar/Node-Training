const router = require("express").Router();
const readTaskByIdController = require("../controllers/tasks-read-controller").readTaskById;

router.get("/",readTaskByIdController);

module.exports = router;