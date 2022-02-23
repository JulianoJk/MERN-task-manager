const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Task = require("../models/task.model")

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({})

        res.json(tasks)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

router.post("/add", async (req, res) => {
    try {
        let {name, user_id} = req.body 
        let newTask = new Task({
            name: name,
            user_id: user_id, 
            completed: false,
        })
        const saved = await newTask.save()
        res.json(saved)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})
router.delete("/delete", async (req, res) => {

    try {
        const {_id} = req.body

        if (!_id) return res.status(400).json({message: "No Task id detected."})

        const deleted = await Task.findByIdAndDelete(_id)

        res.json(deleted)

    }catch (e) {
        return res.status(500).json({error: e.message})
    }
})

module.exports = router

