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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToChange = await Blog.findById(request.params.id)

  const newLikes = request.body.likes

  blogToChange.likes = newLikes

  const updatedBlog = await blogToChange.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter