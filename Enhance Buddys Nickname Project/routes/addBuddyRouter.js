const buddyWriteController = require("../controllers/BuddyWriteController");
const router = require("express").Router();

router.post("/",buddyWriteController.addBuddy);

module.exports = {
    router
};