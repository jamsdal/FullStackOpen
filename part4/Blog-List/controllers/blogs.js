const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogId = request.params.id

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).json('Blog not found in database')
  }

  if ( blog.user.toString() === user.id.toString()) {
    const index = user.blogs.findIndex(blogObject => blogObject.toString() === blogId)
    if (index === -1) {
      return response.status(400).json({ error: 'blog is not found in user list' })
    }
    user.blogs.splice(index, 1)
    await user.save()
    await Blog.findByIdAndDelete(blogId)
    return response.status(204).end()
  }
  return response.status(403).json({ error: 'blog does not belong to user' })
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToChange = await Blog.findById(request.params.id)

  const newLikes = request.body.likes

  blogToChange.likes = newLikes

  const updatedBlog = await blogToChange.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter