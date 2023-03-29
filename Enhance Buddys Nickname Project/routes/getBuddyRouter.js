const router = require("express").Router();
const getBuddy = require("../controllers/BuddyReadController").getBuddy;

router.get("/:id",getBuddy);

module.exports = {
    router,
}