const blogRouters = require('express').Router()
require('express-async-errors')
const Entry = require('../models/entry') 
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//GET all blog entries
blogRouters.get('/', async (request, response) => {
  const blogs = await Entry.find({}).populate('userId', {username: 1, name: 1})
  response.json(blogs.map(blogs => blogs.toJSON()))  
  })

//POST a new blog entry
blogRouters.post('/', async (request, response) => {
  
  const Blog = await new Entry(request.body)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error : 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  if (Blog.likes === undefined) {
    Blog.likes = 0
  }
  
  Blog.user = user.id

  const savedBlog = await Blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())

})

//DELETE a blog entry by id
blogRouters.delete('/:id', async (request, response) => {

  await Entry.findByIdAndRemove(request.params.id)
  response.json(result => response.status(200).json(result))

})

//modify blog entry likes by id
blogRouters.put('/:id', async (request, response) => {

  const entryBody = request.body

  //logger.info(entryBody)

  await Entry.findByIdAndUpdate(request.params.id, { likes : entryBody.likes})
  response.json(result => response.status(200).json(result))
})

module.exports = blogRouters