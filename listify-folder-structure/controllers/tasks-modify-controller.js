const createTask = (req,res) => {
    res.send({"message": "create task route"});
} 

const deleteTask = (req,res) => {
    res.send({"message": "delete task route"});
}

const updateTask = (req,res) => {
    res.send({"message": "update task route"});
}

module.exports = {
    createTask,
    deleteTask,
    updateTask,
}