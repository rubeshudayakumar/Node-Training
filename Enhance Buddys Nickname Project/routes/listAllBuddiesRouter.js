const router = require("express").Router();
const listAllBuddies = require("../controllers/BuddyReadController").listAllBuddies;

router.get("/",listAllBuddies);

module.exports = {
    router,
}