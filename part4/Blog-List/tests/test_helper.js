const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'FullStackOpen',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/',
    likes: 100,
    _id: '6a9338bc949ebb5364410067',
    user: '6a9338bc949ebb5364410069'
  },
  {
    title: 'Learning JavaScript Through Projects',
    author: 'James Daley',
    url: 'https://example.com/learning-javascript',
    likes: 12,
    _id: '6a9338bc949ebb5364410068',
    user: '6a9338bc949ebb5364410069'
  }
]

const testUserPassword = 'Test1234'

const testUser = {
  username: 'TestUser',
  passwordHash: '$2b$10$7krAxkI6n8Es/.g9VhexUukoPd1ANtfuwUAkoCE81iWZDMQiCHdkC',
  name: 'Test User',
  _id: '6a9338bc949ebb5364410069',
  blogs: [
    '6a9338bc949ebb5364410068',
    '6a9338bc949ebb5364410067'
  ]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  testUser,
  testUserPassword
}