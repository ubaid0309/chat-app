const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel")
const authMiddleware = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY)

            req.user = await UserModel.findById(decoded.userId).select("-password");

            next();
        }

    } catch (error) {
        res.status(401).json({ error: error.message });
        console.log(err.message)
    }
}

module.exports = authMiddleware;