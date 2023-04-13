const errorLogger = require("../utils/logger").errorLogger;
const warnLogger = require("../utils/logger").warnLogger;

const httpSuccessObject = (data) => {
    return {
        status: 200,
        data : {
            status: "SUCCESS",
            message : data,
            code : 200,
        }
    };
}

const httpWarnObject = (req,err) => {
    warnLogger.warn(`${err.status || 400} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return {
        status: 400,
        data: {
            status : "WARNING",
            message : err,
            code: 400,
        }
    }
}

const httpErrorObject = (req,err) => {
    errorLogger.error(`${err.status || 500} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return {
        status : 500,
        data : {
            status : "ERROR",
            message : "Some error occured while processing the data",
            code : 500
        }
    };
}

module.exports = {
    httpSuccessObject,
    httpErrorObject,
    httpWarnObject,
}

