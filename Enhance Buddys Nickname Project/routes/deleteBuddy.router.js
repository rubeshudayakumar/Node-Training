const router = require("express").Router();
const deleteBuddyController = require("../controllers/BuddyWrite.controller").deleteBuddy;

router.delete("/:id",deleteBuddyController);

router.delete("/",(req,res) => {
    res.send({"message": "provide the id to delete!"});
});

module.exports = {
    router,
}