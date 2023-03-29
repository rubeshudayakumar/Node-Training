const router = require("express").Router();
const deleteBuddyController = require("../controllers/BuddyWriteController").deleteBuddy;

router.delete("/:id",deleteBuddyController);

module.exports = {
    router,
}