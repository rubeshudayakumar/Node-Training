const router = require("express").Router();
const userLoginController = require("../controllers/user.controller").userLogin;

router.post("/",userLoginController);

module.exports = router;