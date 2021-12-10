const blogRouters = require('express').Router()
require('express-async-errors')
const Entry = require('../models/entry') 
const logger = require('../utils/logger')

blogRouters.get('/', async (request, response) => {
    const blogs = await Entry.find({})
    response.json(blogs.map(blogs => blogs.toJSON()))  
  })
  
blogRouters.post('/', async (request, response) => {

  const Blog = await new Entry(request.body)

  if (Blog.likes === undefined) {
    const blog = new Entry({
      title: Blog.title,
      author: Blog.author,
      url: Blog.url,
      likes: 0
    })
    await blog.save()
  }
  else {
    await Blog.save()
  }

  
  response.json(result => response.status(201).json(result))


})

module.exports = blogRouters