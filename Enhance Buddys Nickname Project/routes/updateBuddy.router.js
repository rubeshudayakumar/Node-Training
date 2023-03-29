const { updateBuddy } = require("../controllers/BuddyWrite.controller");

const router = require("express").Router();

router.put("/:id",updateBuddy);

module.exports = {
    router,
}