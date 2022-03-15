/** 🎉 Imports */
const express = require("express")
const {registerUser, loginUser, getUser} = require("../controllers/users")
const {protect} = require("../middlewares/authMiddleware")

/** ⚙️ Config */
const router = express.Router()

/** ✏️ Routes */
router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getUser)

/** ✨ Export */
module.exports = router
