const errorLogger = require("../utils/logger").errorLogger;
const warnLogger = require("../utils/logger").warnLogger;

const httpSuccessObject = (data) => {
    return {
        status: 200,
        data : data
    };
}

const httpWarnObject = (req,err) => {
    warnLogger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return {
        status: 403,
        data: {
            message : err,
        }
    }
}

const httpErrorObject = (req,err) => {
    errorLogger.error(`${err.status || 500} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return {
        status : 500,
        data : {
            message : err,
        }
    };
}

module.exports = {
    httpSuccessObject,
    httpErrorObject,
    httpWarnObject,
}

