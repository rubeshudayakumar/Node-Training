const userLogin = (req,res) => {
    res.send({"message": "login route"});
}

const userRegister = (req,res) => {
    res.send({"message": "register route"});
}

module.exports = {
    userLogin,
    userRegister,
}