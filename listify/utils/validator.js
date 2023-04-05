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

const taskValidator = (task) => {
    if((/^[0-9]{1,10}$/).test(task.taskId) == false || task.taskId == undefined
    || (/^[a-zA-Z0-9 ]{1,50}$/).test(task.title) == false  || task.title == undefined
    || (/^[a-zA-Z0-9 ]{1,200}$/).test(task.description) == false || task.description == undefined
    || (/^(LOW|MEDIUM|HIGH)$/).test(task.priority) == false || task.priority == undefined
    || (/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(task.dueDate) == false || task.dueDate == undefined
    || Array.isArray(task.taskComments) == false || task.taskComments == undefined){
        return false;
    }
    for(let j=0;j<task.taskComments.length;j++){
        if((/^[0-9]{13,}$/).test(task.taskComments[j].timeStamp)==false 
            || task.taskComments[j].timeStamp == undefined
            || (/^[a-zA-Z0-9 ]{1,100}$/).test(task.taskComments[j].comment) == false
            || task.taskComments[j].comment == undefined){
            return false;
        }
    }
    return true;
}

const taskIdValidator = (taskId) => {
    if((/^[0-9]{1,10}$/).test(taskId) == false || taskId == undefined){
        return false;
    }
    return true;
}

module.exports = {
    userIdAndPasswordValidator,
    isUserExists,
    taskValidator,
    taskIdValidator,
}