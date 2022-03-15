/** 🎉 Imports */
const mongoose = require("mongoose")

/** ⚙️ Connection to DB */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

/** ✨ Export */
module.exports = connectDB