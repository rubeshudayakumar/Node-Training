const validator = (buddy) => {
    if((/^[0-9]{1,30}$/).test(buddy.employeeId)==false || (/^[a-zA-Z]{1,30}$/).test(buddy.realName)==false || (/^[a-zA-Z]{1,30}$/).test(buddy.nickName)==false || 
    (/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(buddy.dob)==false || buddy.hobbies==undefined || buddy.length<=0){
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
    checkIfEmployeeExists
}