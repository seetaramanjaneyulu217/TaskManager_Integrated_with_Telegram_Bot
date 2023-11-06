const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    timeTable: {
        type: Array,
        default: []
    },

    todaysSchedule: {
        type: Array,
        default: []
    },

    completedTodaysTasks: {
        type: Array,
        default: []
    },

    setRemainder: {
        type: Boolean,
        default: false
    },

    telegramProfile: {
        type: String,
        default: ""
    }
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users