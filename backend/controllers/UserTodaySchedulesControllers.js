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

        if (updatedTodaySchedules) {
            res.status(200).json({ msg: 'Task added SuccessFully' })
        }

        else {
            res.json({ msg: 'Error while adding the task' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Error while adding the task' })
    }
}


const markTaskAsDone = async (req, res) => {
    try {
        const userId = req.user.userid
        const taskId = req.body.taskId

        const user = await Users.findById(userId)
        const todaysSchedule = user.todaysSchedule

        const completedTask = todaysSchedule.filter(schedule => schedule.id === taskId)
        const updatedTodaySchedules = todaysSchedule.filter(schedule => schedule.id !== taskId)

        const today = new Date()
        const finalCompletedTask = {
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`.toString(),
            ...completedTask[0]
        }

        const updateFields = {
            $set: {
                todaysSchedule: updatedTodaySchedules,
                completedTodaysTasks: [...user.completedTodaysTasks, finalCompletedTask]
            }
        }

        const result = await Users.updateOne({ _id: userId }, updateFields)
        
        if(result) {
            res.status(200).json({ msg: 'Marked the task as done' })
        }

        else {
            res.status(200).json({ msg: 'Unable to mark the task as done' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error while marking the task as done' })
    }

}
module.exports = { getTodaySchedules, addTodaySchedule, markTaskAsDone }