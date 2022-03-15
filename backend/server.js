/** 🎉 Imports */
const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
const {errorHandler} = require("./middlewares/errorMiddleware")
const connectDB = require("./config/db")
const path = require("path")

/** ✏️ Environment config */
dotenv.config()

/** ✏️ Connect to DB */
connectDB()

/** ✏️ Initial App */
const app = express()

/** ✏️ Middlewares */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/** ✏️ Routes */
app.use("/api/goals", require("./routes/goals"))
app.use("/api/users", require("./routes/users"))

/** ✏️ Serve frontend */
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => res.sendFile(
        path.resolve(__dirname, "../", "frontend", "build", "index.html")
    ));
} else {
    app.get("/", (req, res) => res.send("Please set to production"))
}

/** ✏️ Error handler */
app.use(errorHandler)

/** ✏️ Set port */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))