const mongoose = require('mongoose')

const url = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD)

async function connectDB () {
    await mongoose.connect(url)
    console.log('Database connection successful')
}

module.exports = connectDB