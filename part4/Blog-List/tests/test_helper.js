const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "FullStackOpen",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com/en/",
    likes: 100,
  },
  {
    title: "Learning JavaScript Through Projects",
    author: "James Daley",
    url: "https://example.com/learning-javascript",
    likes: 12,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}