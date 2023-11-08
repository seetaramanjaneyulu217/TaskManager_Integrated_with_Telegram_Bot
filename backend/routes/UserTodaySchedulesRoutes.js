const express = require('express')
const router = express.Router()

// Imports
const AuthorizeUser = require('../auth/auth.js')
const { getTodaySchedules, addTodaySchedule } = require('../controllers/UserTodaySchedulesControllers.js')

router.route('/get-today-schedules').get(AuthorizeUser, getTodaySchedules)
router.route('/add-today-schedule').post(AuthorizeUser, addTodaySchedule)


module.exports = router