const blogRouter = require('./controllers/entries')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')



mongoose.connect(config.MONGODB_URI)

const mongoUrl = 'mongodb://localhost:27017/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app

