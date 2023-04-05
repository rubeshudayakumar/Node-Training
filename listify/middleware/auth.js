let jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token;
    let decoded;
    try {
        token = (req.headers.authorization).split(' ')[1];
        if(token) decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return next();
    } catch(err) {
        res.status(403).send({message : "Invalid token"});
    }
    return next();
}

const generateToken = (userData) => {
    const token = jwt.sign({"userName": userData},process.env.SECRET_KEY);
    return token;
}

module.exports = {
    verifyToken,
    generateToken,
};