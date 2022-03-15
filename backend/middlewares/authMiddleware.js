/** 🎉 Imports */
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

/** ✨ Protect function */
const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from headers
            token = req.headers.authorization.split(" ")[1]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (e) {
            console.log(e.message)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

/** ✨ Export */
module.exports = {
    protect
}