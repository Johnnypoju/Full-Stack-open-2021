const blogRouters = require('express').Router()
require('express-async-errors')
const Entry = require('../models/entry') 
const User = require('../models/user')
const logger = require('../utils/logger')

//GET all blog entries
blogRouters.get('/', async (request, response) => {
  const blogs = await Entry.find({})
  response.json(blogs.map(blogs => blogs.toJSON()))  
  })
  
//POST a new blog entry
blogRouters.post('/', async (request, response) => {

  const Blog = await new Entry(request.body)
  
  const user = await User.findById(Blog.userId)
  const blog = new Entry({
    title: Blog.title,
    author: Blog.author,
    url: Blog.url,
    userId: Blog.userId,
    likes: Blog.likes === undefined ? 0 : Blog.likes
  })

  const savedBlog = await blog.save()
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

  logger.info(entryBody)

  await Entry.findByIdAndUpdate(request.params.id, { likes : entryBody.likes})
  response.json(result => response.status(200).json(result))
})

module.exports = blogRouters