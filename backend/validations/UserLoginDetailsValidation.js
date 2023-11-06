const userLoginDetailsValidation = (email, password) => {
    if(email === '' || password === '') {
        return { msg: 'Fill the details completely' }
    }

    else if(!email.includes('@')) {
        return { msg: 'Email should contain "@"' }
    }

    else if(password.length < 8) {
        return { msg: 'password should be of length >= 8' }
    }
}


module.exports = userLoginDetailsValidation