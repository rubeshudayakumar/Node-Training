const { updateBuddy } = require("../controllers/BuddyWrite.controller");

const router = require("express").Router();

router.put("/:id",updateBuddy);

router.put("/",(req,res) => {
    res.send({"message": "provide the id to update!"});
});

module.exports = {
    router,
}