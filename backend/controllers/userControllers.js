const expressAsyncHandler = require("express-async-handler")
const UserModel = require("../models/userModel")
const generateToken = require("../config/generateToken");
const authMiddleware = require("../middleware/authMiddleware");

const registerUser = expressAsyncHandler(authMiddleware, async (req, res) => {
    const { name, email, password, profilePicture } = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please enter all the details required")
        }

        const userExist = await UserModel.findOne({ email })

        if (userExist) {
            res.status(400);
            throw new Error("User with this email already exists")
        }

        const user = await UserModel.create({
            name,
            email,
            password,
            profilePicture
        })

        if (user) {
            res.status(201);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id)
            })
        }

        else {
            res.status(400);
            throw new Error("Failed to create user");
        }
    }

    catch (err) {
        res.status(404)
        throw new Error(err)
    }
})


const authenticateUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    try {
        if (user && (await user.matchPassword(password))) {
            res.status(200);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id)
            })
        }

        else {
            res.status(401)
            throw new Error("Invalid email or password")
        }
    }

    catch (err) {
        throw new Error(err.message)
    }
})

const allUsers = expressAsyncHandler(async (req, res) => {
    try {
        const searchQuery = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};
        const users = await UserModel.find(searchQuery).find({ _id: { $ne: req.user._id } });
        res.status(200).send(users);
    } catch (error) {
        res.status(404).json({ error: error.message })
        throw new Error(error.message);
    }

})
module.exports = { registerUser, authenticateUser, allUsers };

