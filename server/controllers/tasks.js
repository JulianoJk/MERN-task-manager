const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Task = require("../models/task.model")

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({})

        res.json("tasks")
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

router.post("/add", async (req, res) => {
    try {
        let {name} = req.body 
        let newTask = new Task({
            name: name,
            completed: false,
        })
        const saved = await newTask.save()
        res.json(saved)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

module.exports = router