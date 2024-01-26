const jsonwebtoken = require('jsonwebtoken');

const generateToken = (userId) => {
    return jsonwebtoken.sign({ userId }, process.env.REACT_APP_JWT_SECRET_KEY || "chatappsecret", {
        expiresIn: "365d"
    })
}


module.exports = generateToken;