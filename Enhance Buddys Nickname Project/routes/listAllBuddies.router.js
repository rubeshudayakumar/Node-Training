const router = require("express").Router();
const listAllBuddies = require("../controllers/BuddyRead.controller").listAllBuddies;

router.get("/",listAllBuddies);

module.exports = {
    router,
}