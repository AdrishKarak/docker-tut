const mongoose = require("mongoose")

let isConnecting = false
let isConnected = false

const connectDB = async () => {
    if (isConnected || isConnecting) return

    isConnecting = true

    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB Connected")
        isConnected = true
        isConnecting = false
    } catch (err) {
        console.log("Waiting for MongoDB...")
        isConnecting = false
        setTimeout(connectDB, 5000)
    }
}

module.exports = connectDB
