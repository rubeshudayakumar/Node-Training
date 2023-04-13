const userValidateObjects = [
    {
        keyName: "userName",
        regEx: /^[a-zA-Z_]{1,30}$/,
    },
    {
        keyName: "password",
        regEx: /^[a-zA-Z0-9\W]{8,}$/,
    }
];

const userIdAndPasswordValidator = (user) => {
    for(var i=0;i<userValidateObjects.length;i++){
        if(!(userValidateObjects[i].regEx).test(user[userValidateObjects[i].keyName]) || !(userValidateObjects[i].keyName in user)){
            return false;
        }
    }
    return true;
}

const taskValidateObjects = [
    {
        keyName: "taskId",
        regEx: /^[0-9]{1,10}$/,
    },
    {
        keyName: "title",
        regEx: /^[a-zA-Z0-9 ]{1,50}$/,
    },
    {
        keyName: "description",
        regEx: /^[a-zA-Z0-9 ]{1,200}$/,
    },
    {
        keyName: "priority",
        regEx: /^(LOW|MEDIUM|HIGH)$/,
    },
    {
        keyName: "dueDate",
        regEx: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/,
    },
];


const taskValidator = (task) => {
    for(var i=0;i<taskValidateObjects.length;i++){
        if(!(taskValidateObjects[i].regEx).test(task[taskValidateObjects[i].keyName]) || !(taskValidateObjects[i].keyName in task)){
            return false;
        }
    }
    if(!Array.isArray(task.taskComments) || !("taskComments" in task)){
        return false;
    }
    for(let j=0;j<task.taskComments.length;j++){
        if( !(/^[0-9]{13,}$/).test(task.taskComments[j].timeStamp)
            || !("timeStamp"  in task.taskComments[j])
            || !(/^[a-zA-Z0-9 ]{1,100}$/).test(task.taskComments[j].comment)
            || !("comment" in task.taskComments[j])){
            return false;
        }
    }
    return true;
}

const findTask = (taskId,tasks) => {
    let isTaskFound = false;
    let taskData = {};
    tasks.forEach(task => {
        if(task.taskId==taskId){
            taskData = task;
            isTaskFound = true;
        }
    });
    return [isTaskFound,taskData];
}

const taskIdValidator = (taskId) => {
    if((/^[0-9]{1,10}$/).test(taskId) == false || taskId == undefined){
        return false;
    }
    return true;
}

const checkIfTaskExists = (tasks,taskId) => {
    for(var k = 0; k< tasks.length; k++){
        if(tasks[k].taskId == taskId){
            return k;
        }
    }
    return -1;
}

module.exports = {
    userIdAndPasswordValidator,
    taskValidator,
    taskIdValidator,
    checkIfTaskExists,
    findTask
}