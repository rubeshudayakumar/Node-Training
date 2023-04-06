const errorLogger = require("../utils/logger").errorLogger;

const httpSuccessObject = (req,res,data) => {
    res.status(200).send(data);
}
const httpErrorObject = (req,res,err) => {
    errorLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send({message: err.message});
}

module.exports = {
    httpSuccessObject,
    httpErrorObject,
}

