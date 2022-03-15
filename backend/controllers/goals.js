/** 🎉 Imports */
const asyncHandler = require("express-async-handler")
const Goal = require("../models/Goals")

/**
 * @desc ✏️ Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    // Find all goals
    const goal = await Goal.find({user: req.user.id})
    // Set response
    res.status(200).json(goal)
})

/**
 * @desc ✏️ Set goals
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
    // Check condition
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    // Create goal
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    // Set response
    res.status(200).json(goal)
})

/**
 * @desc ✏️ Update goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    // Find element by ID
    const goal = await Goal.findById(req.params.id)
    // Check condition
    if (!goal) {
        res.status(401)
        throw new Error("Goal not found")
    }
    // Check condition
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }
    // Compare goal user id to request user id
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    // Update element
    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    // Set response
    res.status(200).json(updatedGoal)
})

/**
 * @desc ✏️ Delete goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
    // Find element by ID
    const goal = await Goal.findById(req.params.id)
    // Check condition
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    // Check condition
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }
    // Compare goal user id to request user id
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    // Delete element
    await goal.remove()
    // Set response
    res.status(200).json({id: req.params.id})
})

/** ✨ Export */
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}