const filterTask = (req,res) => {
    res.send({"message": "filter task router"});
}

const sortTask = (req,res) => {
    res.send({"message" : "sort task route"});
}

module.exports = {
    filterTask,
    sortTask,
}