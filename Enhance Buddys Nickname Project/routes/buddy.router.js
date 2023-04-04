const router = require("express").Router();
const buddyWriteController = require("../controllers/BuddyWrite.controller");
const buddyReadController = require("../controllers/BuddyRead.controller");

router.post("/add-buddy",buddyWriteController.addBuddy);

router.delete("/delete-buddy/:id",buddyWriteController.deleteBuddy);

router.put("/update-buddy/:id",buddyWriteController.updateBuddy);

router.get("/get-buddy/:id",buddyReadController.getBuddy);

router.get("/list-all-buddies",buddyReadController.listAllBuddies);

module.exports = router;