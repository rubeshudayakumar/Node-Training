const router = require("express").Router();
const getBuddy = require("../controllers/BuddyRead.controller").getBuddy;

router.get("/:id",getBuddy);

module.exports = {
    router,
}