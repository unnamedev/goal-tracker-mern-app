/** 🎉 Imports */
const {Schema, Types, model} = require("mongoose")

/** ⚙️ Config */
const goalSchema = Schema(
    {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
        text: {
            type: String,
            required: [true, "Please add a text value"]
        }
    },
    {
        timestamps: true
    }
)

/** ✨ Export */
module.exports = model("Goal", goalSchema)