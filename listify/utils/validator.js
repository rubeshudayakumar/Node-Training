const userIdAndPasswordValidator = (user) => {
    if((/^[a-zA-Z_]{1,30}$/).test(user.userName)==false || (/^[a-zA-Z0-9\W]{8,}$/).test(user.password)==false || user.userName==undefined || user.password==undefined){
        return false;
    }
    return true;
}

const isUserExists = (users,userName) => {
    for(var i=0;i<users.length;i++){
        if(users[i].userName==userName){
            return i;
        }
    }
    return -1;
}

module.exports = {
    userIdAndPasswordValidator,
    isUserExists,
}