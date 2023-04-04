const userIdAndPasswordValidator = (user) => {
    if((/^[a-zA-Z_]{1,30}$/).test(user.userName)==false || (/^[a-zA-Z0-9\W]{8,}$/).test(user.password)==false || user.userName==undefined || user.password==undefined){
        return false;
    }
    return true;
}

module.exports = {
    userIdAndPasswordValidator,
}