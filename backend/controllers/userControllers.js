const expressAsyncHandler = require("express-async-handler")
const UserModel = require("../models/userModel")
const generateToken = require("../config/generateToken");
const authMiddleware = require("../middleware/authMiddleware");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, profilePicture } = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please provide all the required fields" });

        }

        const userExist = await UserModel.findOne({ email })

        if (userExist) {
            res.status(400).json({ message: "User with this mail aleready exists" });

        }

        const user = await UserModel.create({
            name,
            email,
            password,
            profilePicture
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id)
            })
        }

        else {
            res.status(400);

        }
    }

    catch (err) {
        res.status(404)
        console.log(err.message)
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
            res.status(401).json({ message: "Invaild email or password" })
        }
    }

    catch (err) {
        console.log(err.message)
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
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error.message })
        console.log(err.message)
    }

})
module.exports = { registerUser, authenticateUser, allUsers };

