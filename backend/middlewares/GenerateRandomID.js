const generateRandomID = () => {
    const alphabetChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numberString = Math.floor(Math.random() * 1050360008000000).toString()

    let resultString = ''
    for (let i = 0; i < numberString.length; i++) {

        resultString += numberString[i]

        if (i < numberString.length - 1) {
            const randomAlphabet = alphabetChars[Math.floor(Math.random() * alphabetChars.length)]
            const randomLowercaseAlphabet = alphabetChars[Math.floor(Math.random() * 26)]
            resultString += randomAlphabet + randomLowercaseAlphabet
        }
    }

    return resultString
}


module.exports = generateRandomID