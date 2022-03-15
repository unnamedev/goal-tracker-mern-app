/** 🎉 Imports */
const express = require("express")
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/goals")
const {protect} = require("../middlewares/authMiddleware")

/** ⚙️ Config */
const router = express.Router()

/** ✏️ Routes */
router.route("/").get(protect, getGoals).post(protect, setGoal)
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal)

/** ✨ Export */
module.exports = router
