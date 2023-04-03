const router = require("express").Router();
const sortTaskController = require("../controllers/tasks-filter-sort-pagination.controller").sortTask;

router.get("/",sortTaskController);

module.exports = router;