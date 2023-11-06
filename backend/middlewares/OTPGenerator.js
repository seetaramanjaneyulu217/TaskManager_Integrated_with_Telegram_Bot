const getotp = require('otp-generator')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// Configurations
dotenv.config()

const otpGenerator = (req) => {
    
    return new Promise((resolve, reject) => {

        const { email } = req.body

        const OTP = getotp.generate(6, {
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: false,
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.TEST_EMAIL,
                pass: process.env.TEST_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Verify your email" <${process.env.TEST_EMAIL}>`,
            to: email,
            subject: "Your OTP",
            html: `Dear User,<br></br><br></br>
                <b>Your one-time password is</b> - <h1>${OTP}</h1>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject('Error sending OTP');
            } else {
                resolve({ msg: 'OTP sent to your email', otp: OTP })
            }
        });
    });
};



module.exports = otpGenerator