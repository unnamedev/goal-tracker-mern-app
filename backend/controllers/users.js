/** 🎉 Imports */
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

/**
 * @desc ✏️ Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    // Get request fields
    const {email, password} = req.body
    // Check user email
    const user = await User.findOne({email})
    // Check condition
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

/**
 * @desc ✏️ Register new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    // Get request fields
    const {name, email, password} = req.body
    // Check condition
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    // Check user exists
    const userExists = await User.findOne({email})
    // Check condition
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    // Check condition
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

/**
 * @desc ✏️ Get user data
 * @route GET /api/users/me
 * @access Private
 */
const getUser = asyncHandler(async (req, res) => {
    // Set request data
    res.status(200).json(req.user)
})

/**
 * @desc ✏️ Generate Token
 * @param id
 * @returns {*}
 */
const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})

/** ✨ Export */
module.exports = {
    loginUser,
    registerUser,
    getUser
}