const router = require("express").Router();
const filterTasksController = require("../controllers/tasks-filter-sort-pagination.controller").filterTask;

router.get("/",filterTasksController);

module.exports = router;