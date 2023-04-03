const router = require("express").Router();
const userRegisterController = require("../controllers/user.controller").userRegister;

router.post("/",userRegisterController);

module.exports = router;