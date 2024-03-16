const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
    return jsonwebtoken.sign({ userId }, process.env.REACT_APP_JWT_SECRET_KEY, {
        expiresIn: "365d"
    })
}


module.exports = generateToken;