const errorLogger = require("../utils/logger").errorLogger;
const warnLogger = require("../utils/logger").warnLogger;

const httpSuccessObject = (req,res,data) => {
    res.status(200).send(data);
}

const httpWarnObject = (req,res,err) => {
    warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(403).send({message: err});
}

const httpErrorObject = (req,res,err) => {
    errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send({message: err.message});
}

module.exports = {
    httpSuccessObject,
    httpErrorObject,
    httpWarnObject,
}

