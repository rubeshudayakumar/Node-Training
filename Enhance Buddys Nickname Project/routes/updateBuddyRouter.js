const { updateBuddy } = require("../controllers/BuddyWriteController");

const router = require("express").Router();

router.put("/:id",updateBuddy);

module.exports = {
    router,
}