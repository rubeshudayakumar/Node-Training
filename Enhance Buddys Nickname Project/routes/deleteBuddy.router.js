const router = require("express").Router();
const deleteBuddyController = require("../controllers/BuddyWrite.controller").deleteBuddy;

router.delete("/:id",deleteBuddyController);

module.exports = {
    router,
}