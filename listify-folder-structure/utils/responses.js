const logger = require("../utils/logger");

const httpErrorObject = (req,res,err) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return ({ status : 500,error : err.message });
} 

const httpWarnObject = (req,res,err) => {
    logger.warn(`${err.status || 403} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return ({ status : 403,error : err});
}

const httpSuccessObject = (req,res,data) => {
    return ({status : 200,message : data});
}

module.exports = {
    httpErrorObject,
    httpWarnObject,
    httpSuccessObject
}