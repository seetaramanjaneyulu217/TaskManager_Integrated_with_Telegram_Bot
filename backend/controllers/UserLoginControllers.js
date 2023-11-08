const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


// Configurations
dotenv.config()


// Imports
const Users = require('../models/userModel.js')
const otpGenerator = require('../middlewares/OTPGenerator.js')
const UserLoginDetailsValidation = require('../validations/UserLoginDetailsValidation.js')

// Global variables
let otp



// Controllers
const sendOTPToTheUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await Users.findOne({ email: email })

        // If user is present then check for the password validation.
        if (user) {
            const presentUser = await bcrypt.compare(password, user.password)

            // If user is present with the credentials then generate a user token.
            if (presentUser) {
                const token = jwt.sign({
                    user: {
                        userid: user._id
                    }
                }, process.env.JWT_SECRET)

                res.status(200).json({ msg: 'Login SuccessFul', token: token })
            }

            else {
                res.json({ msg: 'Password invalid' })
            }
        }


        // If user is not present already then generate otp
        else {

            const message = UserLoginDetailsValidation(email, password)

            if (message !== undefined) {
                res.json({ msg: message })
            }

            else {
                otpGenerator(req)
                .then(message => {
                    otp = message.otp
                    res.json({ msg: message.msg })
                })
            }
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error sending OTP' })
    }
}


const registerUser = async(req, res) => {
    try {
        if (req.body.otp === otp) {
            const { email, password } = req.body

            const encrypted = await bcrypt.hash(password, 10);

            const user = {
                email: email,
                password: encrypted
            }

            await new Users(user).save()

            const presentUser = await Users.findOne({ email: email })
            const token = jwt.sign({
                user: {
                    userid: presentUser._id
                }
            }, process.env.JWT_SECRET)

            res.status(200).json({ msg: 'Login SuccessFul', token: token })
        }

        else {
            res.json({ msg: 'Invalid OTP' })
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { sendOTPToTheUser, registerUser }