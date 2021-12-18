const blogRouter = require('./controllers/entries')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')



mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

const errorHandler = (error, _request, response, next) => {


    if (error.name === 'CastError') {
        console.log(error.message)
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        console.log(error.message)
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

module.exports = app

