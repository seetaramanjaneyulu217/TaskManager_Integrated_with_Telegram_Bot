const express = require('express')
const router = express.Router()

// Imports
const AuthorizeUser = require('../auth/auth.js')
const { getTodaySchedules, addTodaySchedule, markTaskAsDone, deleteTheTask, setRemainder } = require('../controllers/UserTodaySchedulesControllers.js')

router.route('/get-today-schedules').get(AuthorizeUser, getTodaySchedules)
router.route('/add-today-schedule').post(AuthorizeUser, addTodaySchedule)
router.route('/mark-task-as-done').put(AuthorizeUser, markTaskAsDone)
router.route('/delete-the-task').delete(AuthorizeUser, deleteTheTask)
router.route('/set-remainder').put(AuthorizeUser, setRemainder)


module.exports = router