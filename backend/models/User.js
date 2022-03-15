/** 🎉 Imports */
const {Schema, model} = require("mongoose")

/** ⚙️ Config */
const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please add a email"]
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        }
    },
    {
        timestamps: true
    }
)

/** ✨ Export */
module.exports = model("User", userSchema)