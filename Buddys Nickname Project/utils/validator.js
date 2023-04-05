const validationObjects = [
    {
        keyName : "employeeId",
        regEx: /^[0-9]{1,30}$/,
    },
    {
        keyName : "realName",
        regEx: /^[a-zA-Z ]{1,30}$/,
    },
    {
        keyName : "nickName",
        regEx : /^[a-zA-Z ]{1,30}$/,
    },
    {
        keyName : "dob",
        regEx : /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
    },
];

const validator = (buddy) => {
    for(var i=0;i<validationObjects.length;i++){
        if(!(validationObjects[i].keyName in buddy) || (validationObjects[i].regEx).test(buddy[validationObjects[i].keyName])==false){
            return false;
        }
    }
    return true;
}

module.exports = {
    validator,
}