const express = require('express')
const router = express.Router()

// Imports
const AuthorizeUser = require('../auth/auth.js')
const { getTodaySchedules, addTodaySchedule, markTaskAsDone } = require('../controllers/UserTodaySchedulesControllers.js')

router.route('/get-today-schedules').get(AuthorizeUser, getTodaySchedules)
router.route('/add-today-schedule').post(AuthorizeUser, addTodaySchedule)
router.route('/mark-task-as-done').post(AuthorizeUser, markTaskAsDone)


module.exports = router