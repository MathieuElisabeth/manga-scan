const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const { userRoute, mangaRoute } = require('./routes')

require('dotenv').config()

const port = process.env.PORT || 8080

// Permission to post/get JSON files
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Enable cors
const corsOptions = {
    origin: '*'
    // origin: process.env.FRONT_URL
}
app.use(cors(corsOptions))

// API Routes
// User Route
app.use('/api/user', userRoute)
// Manga route
app.use('/api/manga', mangaRoute)

try {
    mongoose.connect(process.env.DB_CONNECT)
    console.log('MongoDB Connected...')
  } catch (error) {
    console.log('error: ', error)
  }

app.listen(port, () => console.log('Server is running')) 