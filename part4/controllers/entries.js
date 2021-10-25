const blogRouters = require('express').Router()
const Entry = require('../models/entry') 

blogRouters.get('/', (request, response) => {
    Entry
      .find({})
      .then(blogs => {
        console.log("succeed")
        response.json(blogs)
      })
  })
  
blogRouters.post('/', (request, response) => {
const Blog = new Entry(request.body)

Blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})

module.exports = blogRouters