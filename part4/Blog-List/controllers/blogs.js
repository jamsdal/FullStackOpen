const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const savedBlog = new Blog(request.body)

  await savedBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter