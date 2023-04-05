const errorLogger = require("../utils/Logger").errorLogger;
const warnLogger = require("../utils/Logger").warnLogger;

const httpErrorObject = (req,res,err) => {
    errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send({"error" : err.message});
} 

const httpWarnObject = (req,res,err) => {
    warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).send({"message": err});
}

const httpSuccessObject = (req,res,data) => {
    res.status(200).send(data);
}

module.exports = {
    httpErrorObject,
    httpWarnObject,
    httpSuccessObject
}