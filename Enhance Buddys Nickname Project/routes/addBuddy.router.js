const buddyWriteController = require("../controllers/BuddyWrite.controller");
const router = require("express").Router();

router.post("/",buddyWriteController.addBuddy);

module.exports = {
    router
};