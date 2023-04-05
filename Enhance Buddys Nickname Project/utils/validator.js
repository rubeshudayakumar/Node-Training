const validatorObjects = [
    {
        keyName : "employeeId",
        regEx : /^[0-9]{1,30}$/,
    },
    {
        keyName : "realName",
        regEx : /^[a-zA-Z]{1,30}$/,
    },
    {
        keyName : "nickName",
        regEx : /^[a-zA-Z]{1,30}$/,
    },
    {
        keyName : "dob",
        regEx : /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
    }
];

const validator = (buddy) => {
    for(var i=0;i<validatorObjects.length;i++){
        if(!(validatorObjects[i].keyName in buddy) || (validatorObjects[i].regEx).test(buddy[validatorObjects[i].keyName])==false){
            return false;
        }
    }
    return true;
}

const idValidator = (paramId,bodyId) => {
    if((/^[0-9]{1,30}$/).test(paramId)==false || paramId!=bodyId){
        return false;
    }
    return true;
}

const checkIfEmployeeExists = (employees,employeeId) => {
    for(var i=0;i<employees.length;i++){
        if(employees[i].employeeId == employeeId){
            return true;
        }
    }
    return false;
}

module.exports = {
    validator,
    checkIfEmployeeExists,
    idValidator
}