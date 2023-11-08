const dotenv = require('dotenv')


// Imports
const Users = require('../models/userModel.js')
const GeneraterandomID = require('../middlewares/GenerateRandomID.js')
const generateRandomID = require('../middlewares/GenerateRandomID.js')

// Controllers

const getTodaySchedules = async (req, res) => {
    try {
        const userId = req.user.userid
        const user = await Users.findById(userId)

        res.status(200).json({ todaySchedules: user.todaysSchedule })
    } catch (error) {
        res.status(500).json({ msg: 'Error while getting your tasks' })
    }
}


const addTodaySchedule = async (req, res) => {
    try {
        const userId = req.user.userid
        const user = await Users.findById(userId)
        const uniqueID = generateRandomID()

        const todayTask = {
            id: uniqueID,
            ...req.body
        }

        const updatedTodaySchedules = await Users.findOneAndUpdate({
            todaysSchedule: [...user.todaysSchedule, todayTask]
        }).where(req.user.userid)

        if(updatedTodaySchedules) {
            res.status(200).json({ msg: 'Task added SuccessFully' })
        }

        else {
            res.json({ msg: 'Error while adding the task' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Error while adding the task' })
    }
}

module.exports = { getTodaySchedules, addTodaySchedule }